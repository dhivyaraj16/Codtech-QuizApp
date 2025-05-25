const ACCESS_CODE = "csquiz123";
let questions = [
  { question: "What does CPU stand for?", answers: [
    { text: "Central Processing Unit", correct: true },
    { text: "Computer Personal Unit", correct: false },
    { text: "Central Programming Unit", correct: false },
    { text: "Control Processing Unit", correct: false }
  ]},
  { question: "What is RAM?", answers: [
    { text: "Random Access Memory", correct: true },
    { text: "Read Access Memory", correct: false },
    { text: "Run Access Memory", correct: false },
    { text: "Rapid Access Module", correct: false }
  ]},
  { question: "Which language is used for web apps?", answers: [
    { text: "Python", correct: false },
    { text: "JavaScript", correct: true },
    { text: "C#", correct: false },
    { text: "Java", correct: false }
  ]},
  { question: "What does HTML stand for?", answers: [
    { text: "HyperText Markup Language", correct: true },
    { text: "HighText Machine Language", correct: false },
    { text: "HyperTool Marking Language", correct: false },
    { text: "Hyperlink and Text Markup Language", correct: false }
  ]},
  { question: "What is a loop used for?", answers: [
    { text: "Repeat a block of code", correct: true },
    { text: "Stop code execution", correct: false },
    { text: "Define a variable", correct: false },
    { text: "Declare a function", correct: false }
  ]},
  { question: "Which of these is a JavaScript loop?", answers: [
    { text: "for", correct: true },
    { text: "repeat", correct: false },
    { text: "next", correct: false },
    { text: "cycle", correct: false }
  ]},
  { question: "What does HTTP stand for?", answers: [
    { text: "HyperText Transfer Protocol", correct: true },
    { text: "HyperTransfer Text Protocol", correct: false },
    { text: "HighText Transfer Protocol", correct: false },
    { text: "HyperText Translate Program", correct: false }
  ]},
  { question: "Which is not an OS?", answers: [
    { text: "Linux", correct: false },
    { text: "Oracle", correct: true },
    { text: "Windows", correct: false },
    { text: "macOS", correct: false }
  ]},
  { question: "Git is used for?", answers: [
    { text: "Version Control", correct: true },
    { text: "Gaming", correct: false },
    { text: "UI Design", correct: false },
    { text: "Debugging", correct: false }
  ]},
  { question: "CSS is for?", answers: [
    { text: "Styling web pages", correct: true },
    { text: "Server-side scripting", correct: false },
    { text: "Creating databases", correct: false },
    { text: "Running logic", correct: false }
  ]},
  { question: "Which one is a NoSQL DB?", answers: [
    { text: "MongoDB", correct: true },
    { text: "MySQL", correct: false },
    { text: "PostgreSQL", correct: false },
    { text: "Oracle", correct: false }
  ]},
  { question: "Full form of API?", answers: [
    { text: "Application Programming Interface", correct: true },
    { text: "Application Program Input", correct: false },
    { text: "Applied Protocol Interface", correct: false },
    { text: "App Process Integration", correct: false }
  ]},
  { question: "Which is a front-end framework?", answers: [
    { text: "React", correct: true },
    { text: "Node.js", correct: false },
    { text: "Express", correct: false },
    { text: "MongoDB", correct: false }
  ]},
  { question: "What is a function?", answers: [
    { text: "Reusable block of code", correct: true },
    { text: "A database", correct: false },
    { text: "A server", correct: false },
    { text: "A variable", correct: false }
  ]},
  { question: "Which HTML tag is used for JavaScript?", answers: [
    { text: "<script>", correct: true },
    { text: "<js>", correct: false },
    { text: "<javascript>", correct: false },
    { text: "<code>", correct: false }
  ]}
];

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const accessInput = document.getElementById("access-code");
const accessError = document.getElementById("access-error");
const accessContainer = document.getElementById("access-container");
const settingsContainer = document.getElementById("settings-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

function verifyAccess() {
  if (accessInput.value.trim() === ACCESS_CODE) {
    accessContainer.style.display = "none";
    settingsContainer.style.display = "block";
    accessError.textContent = "";
  } else {
    accessError.textContent = "Invalid access code.";
  }
}

function startQuiz() {
  shuffle(questions);
  currentQuestionIndex = 0;
  score = 0;
  settingsContainer.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

function showQuestion() {
  resetState();
  const q = questions[currentQuestionIndex];
  questionElement.innerText = `Q${currentQuestionIndex + 1}: ${q.question}`;

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    btn.onclick = () => selectAnswer(btn, answer.correct);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  feedback.textContent = "";
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";
}

function selectAnswer(button, correct) {
  const showFeedback = document.getElementById("live-toggle").checked;
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

  if (correct) {
    button.classList.add("correct");
    if (showFeedback) feedback.textContent = "Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    if (showFeedback) feedback.textContent = "Wrong!";
    const correctBtn = Array.from(answerButtons.children).find(btn =>
      questions[currentQuestionIndex].answers.find(
        ans => ans.text === btn.innerText && ans.correct
      )
    );
    if (correctBtn) correctBtn.classList.add("correct");
  }

  nextButton.style.display = "inline-block";
}

nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

function showScore() {
    resetState();
    questionElement.innerText = "🎉 Quiz Completed!";
    let message = "";
  
    const percent = (score / questions.length) * 100;
    if (percent >= 90) {
      message = "🏆 Excellent! You're a computer science champ!";
    } else if (percent >= 70) {
      message = "🎉 Great job! Keep it up!";
    } else {
      message = "👍 Good effort! Keep practicing!";
    }
  
    scoreContainer.innerHTML = `
      <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
      <p>${message}</p>
    `;
  
    nextButton.innerText = "Restart";
    nextButton.style.display = "inline-block";
    nextButton.onclick = () => location.reload();
  }
  