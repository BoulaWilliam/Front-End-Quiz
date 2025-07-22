// DOM Elements
const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const currentQuestionEl = document.querySelector("#currentQuestion");
const numOfQuestionEl = document.querySelector("#numOfQuestion");
const scoreEl = document.querySelector("#Score");
const finalScoreEl = document.querySelector("#finalScore");
const maxScoreEl = document.querySelector("#maxScore");
const resultMessage = document.querySelector(".resultMessage");
const answersContainer = document.querySelector(".answersContainer");
const progressEl = document.querySelector(".progress");
const restartBtn = resultScreen.querySelector("button");

const topicList = document.querySelector("#topic-list");
const topicBtns = document.querySelectorAll(".topicBtn");

const questionTimerEl = document.querySelector("#questionTimer");
const totalTimerEl = document.querySelector("#totalTimer");
const backToTopicsBtn = document.querySelector("#backToTopicsBtn");

let selectedTopic = "html"; // Default selected topic, can be 'all' now
let filteredQuizData = [];
let currentQuestion = 0;
let score = 0;

const QUESTION_TIME_LIMIT = 30;
let questionTimeLeft = QUESTION_TIME_LIMIT;
let questionTimerInterval;

let totalQuizTimeLimit = 0;
let totalTimeLeft;
let totalTimerInterval;

// All quiz questions (flat list, add topic if you add more subjects later)
const quizData = [
    {
        topic: "html",
        question: "What does HTML stand for?",
        answers: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Text Markup Language",
            "Hyper Tool Markup Level",
        ],
        correct: 2,
    },
    {
        topic: "html",
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: ["<style>", "<script>", "<css>", "<head>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "Which tag is used to create a hyperlink?",
        answers: ["<a>", "<link>", "<href>", "<url>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "How can you make a numbered list?",
        answers: ["<ul>", "<ol>", "<dl>", "<list>"],
        correct: 1,
    },
    {
        topic: "html",
        question: "What is the correct HTML element for inserting a line break?",
        answers: ["<br>", "<break>", "<lb>", "<line>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "Which tag is used to display an image?",
        answers: ["<image>", "<img>", "<pic>", "<src>"],
        correct: 1,
    },
    {
        topic: "html",
        question:
            "Which attribute is used to provide alternative text for an image?",
        answers: ["title", "alt", "src", "caption"],
        correct: 1,
    },
    {
        topic: "html",
        question: "Which tag is used to define a table row?",
        answers: ["<row>", "<tr>", "<td>", "<table>"],
        correct: 1,
    },
    {
        topic: "html",
        question: "Which HTML element defines the title of a document?",
        answers: ["<meta>", "<head>", "<title>", "<h1>"],
        correct: 2,
    },
    {
        topic: "html",
        question: "Where is the correct place to put the <script> tag?",
        answers: [
            "In the <body>",
            "In the <head>",
            "Both <head> and <body> are valid",
            "After </html>",
        ],
        correct: 2,
    },
    {
        topic: "html",
        question: "What is the correct HTML tag for the largest heading?",
        answers: ["<h6>", "<heading>", "<h1>", "<head>"],
        correct: 2,
    },
    {
        topic: "html",
        question: "Which tag is used to define a table header?",
        answers: ["<th>", "<thead>", "<header>", "<td>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "Which element is used to create a dropdown list?",
        answers: ["<input>", "<select>", "<list>", "<dropdown>"],
        correct: 1,
    },
    {
        topic: "html",
        question: "Which input type defines a slider control?",
        answers: ["range", "slider", "number", "scroll"],
        correct: 0,
    },
    {
        topic: "html",
        question: "What does the 'action' attribute in a form specify?",
        answers: [
            "JavaScript to run",
            "The page to redirect to",
            "The file that will process form data",
            "The CSS file for the form",
        ],
        correct: 2,
    },
    {
        topic: "html",
        question: "Which tag is used to embed a video file?",
        answers: ["<media>", "<video>", "<movie>", "<file>"],
        correct: 1,
    },
    {
        topic: "html",
        question: "Which HTML tag is used for creating an unordered list?",
        answers: ["<ol>", "<ul>", "<list>", "<li>"],
        correct: 1,
    },
    {
        topic: "html",
        question: "How do you create a checkbox in HTML?",
        answers: [
            "<input type='check'>",
            "<input type='checkbox'>",
            "<checkbox>",
            "<check>",
        ],
        correct: 1,
    },
    {
        topic: "html",
        question:
            "Which attribute sets the text that appears when you hover over an element?",
        answers: ["tooltip", "hover", "alt", "title"],
        correct: 3,
    },
    {
        topic: "html",
        question: "What is the purpose of the <fieldset> tag?",
        answers: [
            "Group related form elements",
            "Create a field",
            "Input data",
            "Create a text box",
        ],
        correct: 0,
    },
    {
        topic: "html",
        question: "What does the <label> tag do?",
        answers: [
            "Adds a label above input",
            "Defines an input",
            "Binds text to form control",
            "Creates a legend",
        ],
        correct: 2,
    },
    {
        topic: "html",
        question: "Which tag defines a cell in a table?",
        answers: ["<td>", "<tr>", "<th>", "<cell>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "Which element represents a self-contained piece of content?",
        answers: ["<section>", "<div>", "<article>", "<aside>"],
        correct: 2,
    },
    {
        topic: "html",
        question: "Which tag defines emphasized text?",
        answers: ["<em>", "<strong>", "<italic>", "<bold>"],
        correct: 0,
    },
    {
        topic: "html",
        question: "What is the correct HTML tag to make text italic?",
        answers: ["<italic>", "<em>", "<i>", "<it>"],
        correct: 2,
    },
    // Now CSS questions
    {
        topic: "css",
        question: "What does CSS stand for?",
        answers: [
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Simple Sheets",
        ],
        correct: 0,
    },
    {
        topic: "css",
        question: "Which property is used to change the background color?",
        answers: ["color", "bgcolor", "background-color", "background"],
        correct: 2,
    },
    {
        topic: "css",
        question: "How do you insert a comment in a CSS file?",
        answers: ["// this is a comment", "", "/* comment */", "# comment"],
        correct: 2,
    },
    {
        topic: "css",
        question: "Which property is used to change the text color of an element?",
        answers: ["font-color", "text-color", "color", "text-style"],
        correct: 2,
    },
    {
        topic: "css",
        question: "Which CSS property controls the text size?",
        answers: ["text-style", "font-size", "font-weight", "text-size"],
        correct: 1,
    },
    {
        topic: "css",
        question: "What is the correct CSS syntax to make all <p> elements bold?",
        answers: [
            "p {text-size: bold;}",
            "p {font-weight: bold;}",
            "p {font: bold;}",
            "p {text-style: bold;}",
        ],
        correct: 1,
    },
    {
        topic: "css",
        question: "How do you make a list not display bullet points?",
        answers: [
            "list: none;",
            "list-style: none;",
            "bullet: none;",
            "text-style: none;",
        ],
        correct: 1,
    },
    {
        topic: "css",
        question: "Which CSS property is used to make text uppercase?",
        answers: ["text-transform", "font-case", "text-style", "text-capital"],
        correct: 0,
    },
    {
        topic: "css",
        question:
            "Which value of the position property makes an element stay in the same place even when scrolling?",
        answers: ["relative", "static", "fixed", "absolute"],
        correct: 2,
    },
    {
        topic: "css",
        question: "What does z-index control?",
        answers: ["Text size", "Stacking order", "Line height", "Box shadow"],
        correct: 1,
    },
    {
        topic: "css",
        question: "How do you make an element 100px tall?",
        answers: [
            "height = 100px;",
            "size: 100px;",
            "height: 100px;",
            "length: 100px;",
        ],
        correct: 2,
    },
    {
        topic: "css",
        question: "How do you select an element with id 'header'?",
        answers: [".header", "header", "#header", "*header"],
        correct: 2,
    },
    {
        topic: "css",
        question: "How do you select all <p> elements inside a <div>?",
        answers: ["div > p", "div p", "div+p", "div.p"],
        correct: 1,
    },
    {
        topic: "css",
        question: "Which shorthand property sets all padding values?",
        answers: ["padding-all", "padding", "all-padding", "padding-value"],
        correct: 1,
    },
    {
        topic: "css",
        question: "What does the 'display: flex' property do?",
        answers: [
            "Makes items stack vertically",
            "Aligns items with fixed width",
            "Creates a flex container for layout",
            "Floats elements left",
        ],
        correct: 2,
    },
    {
        topic: "css",
        question: "Which property is used to add space outside an element?",
        answers: ["padding", "spacing", "margin", "border-spacing"],
        correct: 2,
    },
    {
        topic: "css",
        question: "How do you create a class in CSS?",
        answers: ["#classname", ".classname", "@classname", "$classname"],
        correct: 1,
    },
    {
        topic: "css",
        question: "Which property is used to set the font type?",
        answers: ["font-type", "font-family", "font-style", "font-name"],
        correct: 1,
    },
    {
        topic: "css",
        question: "How do you make an element disappear but keep its space?",
        answers: [
            "visibility: hidden",
            "display: none",
            "opacity: 0",
            "position: hidden",
        ],
        correct: 0,
    },
    {
        topic: "css",
        question: "Which value makes a border invisible?",
        answers: ["hidden", "transparent", "none", "0px"],
        correct: 2,
    },
    {
        topic: "css",
        question: "What property is used for rounded corners?",
        answers: ["corner-radius", "round", "radius", "border-radius"],
        correct: 3,
    },
    {
        topic: "css",
        question: "Which CSS unit is relative to the parent element's font size?",
        answers: ["px", "em", "%", "vh"],
        correct: 1,
    },
    {
        topic: "css",
        question: "Which pseudo-class targets the first child element?",
        answers: [":first", ":first-child", "::first", ":child-first"],
        correct: 1,
    },
    {
        topic: "css",
        question: "What does the 'overflow' property control?",
        answers: [
            "Font spacing",
            "How content is clipped or scrolled when it overflows",
            "Page margins",
            "Text formatting",
        ],
        correct: 1,
    },
    {
        topic: "css",
        question: "Which of the following is not a valid display value?",
        answers: ["inline", "block", "show", "flex"],
        correct: 2,
    },

    // All JavaScript questions
    {
        topic: "javascript",
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: ["var", "int", "let", "define"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "What is the output of '2' + 2 in JavaScript?",
        answers: ["4", "22", "NaN", "undefined"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "#", "", "** comment **"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "Which function converts JSON to a JavaScript object?",
        answers: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.toObject()",
        ],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "Which statement is used to skip an iteration in a loop?",
        answers: ["skip", "break", "continue", "return"],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "Which of these is a JavaScript framework?",
        answers: ["Laravel", "React", "Django", "Flask"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What does the push() method do?",
        answers: [
            "Removes the last element",
            "Adds element to the beginning",
            "Adds element to the end",
            "Sorts the array",
        ],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "Which method removes the last item from an array?",
        answers: ["pop()", "shift()", "splice()", "remove()"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "How do you convert a number to a string?",
        answers: ["String(num)", "num.toString()", "Both", "None"],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "Which method joins array elements into a string?",
        answers: ["concat()", "join()", "merge()", "combine()"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "Which operator is used for exponentiation?",
        answers: ["^", "**", "exp()", "^^"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "How do you write a conditional (ternary) operator?",
        answers: [
            "if ? else :",
            "condition ? true : false",
            "if ? true : false",
            "? :",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What does the 'this' keyword refer to in a method?",
        answers: [
            "The global object",
            "The method name",
            "The current object",
            "The parent object",
        ],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: ["onmouseover", "onchange", "onclick", "onmouseclick"],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "How can you detect the type of a variable?",
        answers: ["typeof()", "getType()", "typeof", "detect()"],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "What is a closure in JavaScript?",
        answers: [
            "A function inside a loop",
            "A nested function with its lexical scope",
            "A return statement",
            "A class inside a function",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What is an IIFE?",
        answers: [
            "An external library",
            "An Immediately Invoked Function Expression",
            "A loop structure",
            "A special class",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What is a promise in JavaScript?",
        answers: [
            "A way to handle errors",
            "A value that might be available in the future",
            "A function",
            "A loop",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What is the default behavior of event bubbling?",
        answers: [
            "Events move from target to root",
            "Events are prevented",
            "Events move from root to target",
            "No propagation",
        ],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "What does 'use strict' do?",
        answers: [
            "Enables modern mode",
            "Prevents certain errors",
            "Disallows undeclared variables",
            "All of the above",
        ],
        correct: 3,
    },
    {
        topic: "javascript",
        question: "Which keyword is used to handle errors?",
        answers: ["try", "catch", "throw", "All of the above"],
        correct: 3,
    },
    {
        topic: "javascript",
        question: "What is hoisting?",
        answers: [
            "Calling functions inside others",
            "Lifting variable/function declarations to top",
            "Compiling code early",
            "Moving DOM elements",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "Which method is used to filter elements in an array?",
        answers: ["select()", "filter()", "map()", "choose()"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "How do you stop an interval timer?",
        answers: [
            "clearInterval()",
            "stopInterval()",
            "cancelInterval()",
            "endInterval()",
        ],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "What does the `map()` method do?",
        answers: [
            "Modifies the array",
            "Filters array",
            "Returns a new array",
            "Sorts array",
        ],
        correct: 2,
    },
    {
        topic: "javascript",
        question: "Which of the following is a falsy value?",
        answers: ["0", "false", "''", "All of the above"],
        correct: 3,
    },
    {
        topic: "javascript",
        question: "How do you round a number down in JavaScript?",
        answers: ["Math.round()", "Math.floor()", "Math.ceil()", "Math.trunc()"],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "Which object is the root of the DOM hierarchy?",
        answers: ["body", "html", "document", "window"],
        correct: 3,
    },
    {
        topic: "javascript",
        question: "Which method adds an element at the beginning of an array?",
        answers: ["unshift()", "shift()", "push()", "addFirst()"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "How do you prevent default behavior in an event?",
        answers: [
            "event.stop()",
            "event.preventDefault()",
            "event.break()",
            "event.cancel()",
        ],
        correct: 1,
    },
    {
        topic: "javascript",
        question: "What does async/await simplify?",
        answers: ["Promises", "Objects", "Loops", "Events"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "What is the result of `typeof []`?",
        answers: ["object", "array", "list", "undefined"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "Which symbol is used to spread an array?",
        answers: ["...", "..", "**", "///"],
        correct: 0,
    },
    {
        topic: "javascript",
        question: "Which one is used to convert a value to boolean?",
        answers: ["!!value", "Boolean(value)", "Both", "None"],
        correct: 2,
    },
];

// Handle topic selection
topicBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        selectedTopic = btn.dataset.topic;
        Toastify({
            text: `Selected Topic: ${selectedTopic.toUpperCase()}`,
            duration: 3000,
            gravity: "top", // top or bottom
            position: "center", // left, center or right
            backgroundColor: "green",
            stopOnFocus: true,
            className: "toastify-custom",
        }).showToast();
    });
});

// Event Listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
backToTopicsBtn.addEventListener("click", backToStartScreen);

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const shuffledQuestions = shuffleArray(quizData);

// Start Quiz
function startQuiz() {
    // --- MODIFIED: Filter quiz data based on selected topic, or use all questions ---
    if (selectedTopic === "all") {
        filteredQuizData = shuffledQuestions;
    } else {
        filteredQuizData = quizData.filter((q) => q.topic === selectedTopic);
    }
    // --- END MODIFIED ---

    if (filteredQuizData.length === 0) {
        Toastify({
            text: `No questions found for ${selectedTopic.toUpperCase()}. Please select another topic.`,
            duration: 5000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
            stopOnFocus: true,
            className: "toastify-custom",
        }).showToast();
        return;
    }

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");

    currentQuestion = 0;
    score = 0;

    // Start Total Quiz Timer
    totalQuizTimeLimit = filteredQuizData.length * QUESTION_TIME_LIMIT;
    totalTimeLeft = totalQuizTimeLimit;
    totalTimerEl.textContent = totalTimeLeft;

    clearInterval(totalTimerInterval);
    totalTimerInterval = setInterval(() => {
        totalTimeLeft--;
        totalTimerEl.textContent = totalTimeLeft;

        if (totalTimeLeft <= 0) {
            clearInterval(totalTimerInterval);
            Toastify({
                text: "Total quiz time is up!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                stopOnFocus: true,
                className: "toastify-custom",
            }).showToast();
            showResult();
        }
    }, 1000);

    showQuestion();
    updateScore();
}

// Show Question
function showQuestion() {
    clearInterval(questionTimerInterval);
    questionTimeLeft = QUESTION_TIME_LIMIT;
    questionTimerEl.textContent = questionTimeLeft;

    questionTimerInterval = setInterval(() => {
        questionTimeLeft--;
        questionTimerEl.textContent = questionTimeLeft;

        if (questionTimeLeft <= 0) {
            clearInterval(questionTimerInterval);
            Toastify({
                text: "Time's up for this question!",
                duration: 1500,
                gravity: "top",
                position: "center",
                backgroundColor: "orange",
                stopOnFocus: true,
                className: "toastify-custom",
            }).showToast();
            selectAnswer(-1);
        }
    }, 1000);

    const q = filteredQuizData[currentQuestion];
    quizScreen.querySelector(".quizTitle").textContent = q.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    numOfQuestionEl.textContent = filteredQuizData.length;
    answersContainer.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("answerBtn");
        btn.addEventListener("click", () => {
            clearInterval(questionTimerInterval);
            selectAnswer(index);
        });
        answersContainer.appendChild(btn);
    });

    updateProgress();
}

// Handle Answer Selection
function selectAnswer(selectedIndex) {
    clearInterval(questionTimerInterval);

    const correctIndex = filteredQuizData[currentQuestion].correct;

    if (selectedIndex !== -1 && selectedIndex === correctIndex) {
        score++;
        updateScore();
    }

    currentQuestion++;

    if (currentQuestion < filteredQuizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Update Score UI
function updateScore() {
    scoreEl.textContent = score;
}

// Progress Bar
function updateProgress() {
    const progress = (currentQuestion / filteredQuizData.length) * 100;
    progressEl.style.width = `${progress}%`;
}

// Show Final Result
function showResult() {
    clearInterval(questionTimerInterval);
    clearInterval(totalTimerInterval);

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreEl.textContent = score;
    maxScoreEl.textContent = filteredQuizData.length;

    let message = "Good job!";
    if (score === filteredQuizData.length) message = "Excellent!";
    else if (score <= filteredQuizData.length / 2) message = "Keep practicing!";
    resultMessage.textContent = message;

    progressEl.style.width = `100%`;
}

// Restart Quiz
function restartQuiz() {
    clearInterval(questionTimerInterval);
    clearInterval(totalTimerInterval);

    questionTimeLeft = QUESTION_TIME_LIMIT;
    questionTimerEl.textContent = questionTimeLeft;
    totalTimerEl.textContent = 0;

    startScreen.classList.add("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    currentQuestion = 0;
    score = 0;
    selectedTopic = "html"; // Reset to a default topic
}

// Function to go back to the start screen (topic selection)
function backToStartScreen() {
    clearInterval(questionTimerInterval);
    clearInterval(totalTimerInterval);

    currentQuestion = 0;
    score = 0;
    questionTimeLeft = QUESTION_TIME_LIMIT;
    questionTimerEl.textContent = questionTimeLeft;
    totalTimerEl.textContent = 0;

    startScreen.classList.add("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    selectedTopic = "html"; // Reset to a default topic
}
