const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_super_secret_jwt_key_change_in_production';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure SQLite uses a permanent, absolute path in your project directory
const dbPath = path.resolve(__dirname, 'codequest.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log(`Connected to SQLite database at: ${dbPath}`);
});

// Initialize Database Tables and Auto-Seed Admin Account
db.serialize(() => {
  // 1. Create Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      middle_initial TEXT
    )
  `);

  // 2. Create Scores Table
  db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      quiz_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // 3. AUTO-SEED ADMIN ACCOUNT (Saves automatically on startup)
  const adminUsername = 'admin';
  const adminEmail = 'admin@codequest.com';
  const adminPasswordRaw = 'admin123'; // Default admin password

  db.get(`SELECT id FROM users WHERE username = ?`, [adminUsername], async (err, row) => {
    if (err) {
      console.error('Error checking for admin account:', err);
      return;
    }
    if (!row) {
      try {
        const hashedPassword = await bcrypt.hash(adminPasswordRaw, 10);
        const seedSql = `
          INSERT INTO users (username, password, email, first_name, last_name, middle_initial)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.run(seedSql, [adminUsername, hashedPassword, adminEmail, 'Admin', 'User', 'System'], function (seedErr) {
          if (seedErr) console.error('Failed to auto-seed admin user:', seedErr);
          else console.log(`SUCCESS: Admin account initialized (Username: '${adminUsername}', Password: '${adminPasswordRaw}')`);
        });
      } catch (hashErr) {
        console.error('Error hashing admin password:', hashErr);
      }
    } else {
      console.log("Admin account is saved and ready.");
    }
  });
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ENDPOINTS ---

// Register New User
app.post('/api/register', async (req, res) => {
  const { username, password, email, first_name, last_name, middle_initial } = req.body;

  if (!username || !password || !email || !first_name || !last_name) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (username, password, email, first_name, last_name, middle_initial) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [username, hashedPassword, email, first_name, last_name, middle_initial || ''], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or Email already exists' });
        }
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'Registration successful! You can now log in.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login User
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign(
      { id: user.id, username: user.username, first_name: user.first_name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });
  });
});

// Forgot Password
app.post('/api/forgot-password', async (req, res) => {
  const { email, new_password } = req.body;

  if (!email || !new_password) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  db.get(`SELECT id FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    if (!user) return res.status(404).json({ error: 'No account found with this email' });

    try {
      const hashedPassword = await bcrypt.hash(new_password, 10);
      db.run(`UPDATE users SET password = ? WHERE email = ?`, [hashedPassword, email], function (err) {
        if (err) return res.status(500).json({ error: 'Failed to reset password' });
        res.json({ message: 'Password reset successful! You can now log in.' });
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error processing password reset' });
    }
  });
});

// Verify Current Token / Get Active Profile
app.get('/api/me', authenticateToken, (req, res) => {
  db.get(`SELECT id, username, email, first_name, last_name FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});

// --- SCORES ENDPOINT ---

// Submit Quiz Score
app.post('/api/scores', authenticateToken, (req, res) => {
  const { quiz_name, score, max_score } = req.body;
  const user_id = req.user.id;

  if (!quiz_name || score === undefined || !max_score) {
    return res.status(400).json({ error: 'Missing required score fields' });
  }

  const sql = `INSERT INTO scores (user_id, quiz_name, score, max_score) VALUES (?, ?, ?, ?)`;
  db.run(sql, [user_id, quiz_name, score, max_score], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to record score' });
    res.status(201).json({ message: 'Score saved to database!', scoreId: this.lastID });
  });
});

// --- ADMIN DASHBOARD ENDPOINTS ---

// Get All Users & Quiz Scores (Admin Only)
app.get('/api/admin/user-scores', authenticateToken, (req, res) => {
  if (req.user.username !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin access required.' });
  }

  const sql = `
    SELECT 
      u.id AS user_id,
      u.username,
      u.first_name,
      u.last_name,
      u.email,
      s.quiz_name,
      s.score,
      s.max_score,
      s.created_at
    FROM users u
    LEFT JOIN scores s ON u.id = s.user_id
    ORDER BY u.id ASC, s.created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve admin records' });
    res.json(rows);
  });
});

// Delete User and their Scores (Admin Only)
app.delete('/api/admin/users/:id', authenticateToken, (req, res) => {
  if (req.user.username !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin access required.' });
  }

  const userId = req.params.id;

  if (parseInt(userId) === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete the admin account.' });
  }

  db.run(`DELETE FROM scores WHERE user_id = ?`, [userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user scores.' });

    db.run(`DELETE FROM users WHERE id = ?`, [userId], function (err) {
      if (err) return res.status(500).json({ error: 'Failed to delete user.' });
      if (this.changes === 0) return res.status(404).json({ error: 'User not found.' });

      res.json({ message: 'User deleted successfully.' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
