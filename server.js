document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const authModal = document.getElementById('auth-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotForm = document.getElementById('forgot-form');

  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const showForgotLink = document.getElementById('show-forgot');
  const backToLoginLink = document.getElementById('back-to-login');

  const navAuthBtn = document.getElementById('nav-auth-btn');
  const userProfileNav = document.getElementById('user-profile-nav');
  const userNameSpan = document.getElementById('user-name-span');
  const logoutBtn = document.getElementById('logout-btn');

  const adminDashboard = document.getElementById('admin-dashboard');
  const mainContent = document.getElementById('main-content'); // Main section with topics/quizzes

  // Initialize App State
  checkAuthState();

  // --- Modal Navigation ---
  if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
    });
  }

  if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    });
  }

  if (showForgotLink) {
    showForgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      forgotForm.classList.remove('hidden');
    });
  }

  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      forgotForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    });
  }

  if (navAuthBtn) {
    navAuthBtn.addEventListener('click', () => {
      authModal.classList.remove('hidden');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // --- Auth Handlers ---

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username').value;
      const passwordInput = document.getElementById('login-password').value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('codequest_token', data.token);
          localStorage.setItem('codequest_user', JSON.stringify(data.user));
          
          alert(`Welcome back, ${data.user.first_name}!`);
          authModal.classList.add('hidden');
          loginForm.reset();
          
          checkAuthState();
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Server error during login.');
      }
    });
  }

  // REGISTER
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        username: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        first_name: document.getElementById('reg-fname').value,
        last_name: document.getElementById('reg-lname').value,
        middle_initial: document.getElementById('reg-mi').value,
        password: document.getElementById('reg-password').value
      };

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful! Please log in.');
          registerForm.reset();
          registerForm.classList.add('hidden');
          loginForm.classList.remove('hidden');
        } else {
          alert(data.error || 'Registration failed');
        }
      } catch (err) {
        console.error('Register error:', err);
        alert('Server error during registration.');
      }
    });
  }

  // FORGOT PASSWORD
  if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email').value;
      const new_password = document.getElementById('forgot-new-password').value;

      try {
        const response = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, new_password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Password updated! You can now log in.');
          forgotForm.reset();
          forgotForm.classList.add('hidden');
          loginForm.classList.remove('hidden');
        } else {
          alert(data.error || 'Failed to reset password');
        }
      } catch (err) {
        console.error('Forgot password error:', err);
        alert('Server error during password reset.');
      }
    });
  }

  // --- AUTH STATE CHECKER ---
  function checkAuthState() {
    const user = JSON.parse(localStorage.getItem('codequest_user'));
    const token = localStorage.getItem('codequest_token');

    if (token && user) {
      // Hide login modal
      if (authModal) authModal.classList.add('hidden');

      // Update Nav Bar UI
      if (navAuthBtn) navAuthBtn.classList.add('hidden');
      if (userProfileNav) userProfileNav.classList.remove('hidden');
      if (userNameSpan) userNameSpan.textContent = user.first_name;

      // Handle View Routing based on role
      if (user.role === 'admin') {
        if (mainContent) mainContent.classList.add('hidden');
        if (adminDashboard) {
          adminDashboard.classList.remove('hidden');
          loadAdminData();
        }
      } else {
        // REGULAR USER: Reveal topics/quizzes, hide admin dashboard
        if (adminDashboard) adminDashboard.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
      }
    } else {
      // LOGGED OUT STATE
      if (navAuthBtn) navAuthBtn.classList.remove('hidden');
      if (userProfileNav) userProfileNav.classList.add('hidden');
      if (adminDashboard) adminDashboard.classList.add('hidden');
      if (mainContent) mainContent.classList.remove('hidden'); // Default main layout view
    }
  }

  function handleLogout() {
    localStorage.removeItem('codequest_token');
    localStorage.removeItem('codequest_user');
    checkAuthState();
    window.location.reload();
  }

  // --- ADMIN DATA FETCHING ---
  async function loadAdminData() {
    const token = localStorage.getItem('codequest_token');
    const tableBody = document.getElementById('admin-table-body');

    if (!tableBody) return;

    try {
      const response = await fetch('/api/admin/user-scores', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        tableBody.innerHTML = '';
        data.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.user_id}</td>
            <td>${row.first_name} ${row.last_name} (@${row.username})</td>
            <td>${row.email}</td>
            <td>${row.quiz_name || 'N/A'}</td>
            <td>${row.score !== null ? `${row.score} / ${row.max_score}` : 'Not attempted'}</td>
            <td>
              ${row.username !== 'admin' ? `<button class="delete-user-btn" data-id="${row.user_id}">Delete User</button>` : '<em>Protected</em>'}
            </td>
          `;
          tableBody.appendChild(tr);
        });

        // Attach Delete Listeners
        document.querySelectorAll('.delete-user-btn').forEach(button => {
          button.addEventListener('click', handleDeleteUser);
        });
      } else {
        alert(data.error || 'Failed to load admin dashboard.');
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    }
  }

  async function handleDeleteUser(e) {
    const userId = e.target.getAttribute('data-id');
    if (!confirm(`Are you sure you want to delete user ID #${userId}?`)) return;

    const token = localStorage.getItem('codequest_token');

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        alert('User deleted.');
        loadAdminData(); // Refresh table
      } else {
        alert(data.error || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error deleting user.');
    }
  }
});
