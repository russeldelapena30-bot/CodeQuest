document.addEventListener("DOMContentLoaded", () => {
  // Existing init functions...
  
  // Load dynamic content from server
  fetchTopics();
  fetchQuizzes();
});

/**
 * Fetch and render learning topics from server.js
 */
async function fetchTopics() {
  const container = document.getElementById("topics-container");
  if (!container) return;

  try {
    const response = await fetch("/api/topics");
    if (!response.ok) throw new Error("Failed to load topics");
    
    const topics = await response.json();
    
    // Clear static fallback HTML
    container.innerHTML = "";

    if (topics.length === 0) {
      container.innerHTML = "<p>No topics available at the moment.</p>";
      return;
    }

    topics.forEach(topic => {
      const card = document.createElement("div");
      card.className = "topic-card";
      card.innerHTML = `
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.description)}</p>
        <button class="btn-secondary" onclick="startTopic(${topic.id})">Start Topic</button>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching topics:", error);
  }
}

/**
 * Fetch and render available quizzes from server.js
 */
async function fetchQuizzes() {
  const container = document.getElementById("quizzes-container");
  if (!container) return;

  try {
    const response = await fetch("/api/quizzes");
    if (!response.ok) throw new Error("Failed to load quizzes");
    
    const quizzes = await response.json();

    // Clear static fallback HTML
    container.innerHTML = "";

    if (quizzes.length === 0) {
      container.innerHTML = "<p>No quizzes available right now.</p>";
      return;
    }

    quizzes.forEach(quiz => {
      const card = document.createElement("div");
      card.className = "quiz-card";
      card.innerHTML = `
        <h4>${escapeHtml(quiz.title)}</h4>
        <p>${quiz.question_count || '10'} Questions | ${escapeHtml(quiz.difficulty || 'Beginner')}</p>
        <button class="btn-action" onclick="startQuiz(${quiz.id})">Take Quiz</button>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
}

/**
 * Helper function to prevent XSS injection
 */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

/**
 * Placeholder action handlers
 */
function startTopic(topicId) {
  console.log("Starting topic ID:", topicId);
  // Route or trigger modal/view for this topic
}

function startQuiz(quizId) {
  console.log("Starting quiz ID:", quizId);
  // Route or trigger quiz player modal
}
