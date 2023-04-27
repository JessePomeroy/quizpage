//timer
let timer = document.getElementById("timer");
let timeLeft = 60;

//questions
let questionContent = document.getElementById("question");
let questionCount = 0;

//answer
let answer = document.getElementById("answer");

//score
let scores = document.getElementById("scores");
let allNames = document.getElementById("allNames");
let allScores = document.getElementById("allScores");

//quiz
let quiz = document.getElementById("quiz");
let title = document.getElementById("title");
let complete = false

//buttons
let startButton = document.getElementById("start");
let restartButton = document.getElementById("restart");

//data
const questionArray =
    [{
        question: "inside which html element do we put the javascript?",
        choices: ["<js>", "<javascript>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "what is the correct javascript syntax to change the content of the html element below?: <p id='demo'>this is a demonstration.</p>",
        choices: ["#demo.innterHTML = 'Hello world!';", "docutment.getElementByName('p').innerHTML = 'Hello World!';", "document.getElementById('demo')"],
        answer: "document.getElementById('demo').innerHTML = 'Hello world!';"
    },
    {
        question: "where is the correct place to insert a javascript?",
        choices: ["the <head> section", "the <body> section", "both the <head> and the <body> section are correct."],
        answer: "both the <head> and the <body> section are correct."
    },
    {
        question: "what is the correct syntax for referring to an external script called xxx.js?",
        choices: ["<script href='xxx.js'>", "<script src='xxx.js'>", "<script name='xxx.js'>"],
        answer: "<script src='xxx.js'>"
    }];

//event listeners
startButton.addEventListener("click", function () {
    startButton.classList.add("hide");
    startQuiz();
});

restartButton.addEventListener("click", function () {
    location.reload();
});

//functions
function startQuiz() {
    countdown();
    showQuestion();
}
// timer
function countdown() {
    const interval = setInterval(() => {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft + " seconds";
        if (timeLeft <= 0 || complete) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}
// populates question and choices
function showQuestion() {
    answer.innerHTML = '';
    let totalCount = questionArray.length;
    let currentQuestion = questionArray[questionCount]
    questionContent.innerHTML = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
        let option = document.createElement("div");
        option.innerText = choice;
        option.className = "choice";
        option.addEventListener("click", () => {
            check(choice, currentQuestion.answer, totalCount);
        });
        answer.appendChild(option);
    });
}
// check if answer is right or wrong and if wrong deducts 5 seconds from the time/score
function check(choice, answer, totalCount) {
    if (choice === answer) {
        alert("Good job dawg")
    } else {
        alert("Nah, you tripping")
        timeLeft = timeLeft - 5;
    }
    questionCount++;
    if (questionCount === totalCount) {
        complete = true
    } else {
        showQuestion();
    }
}
// anounces end and sets scores to local storage and calls the createScores function
function endQuiz() {
    quiz.classList.add("hide");
    var name = prompt("Quiz is over! Your quiz score is: " + timeLeft + "\nEnter your name to submit your score:");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    if (name) {
        highScores.push({ name: name, score: timeLeft });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        highScores.sort((a, b) => b.score - a.score);
        createScores(highScores);
    } else {
        endQuiz();
    }
}
// populates the scores onto the screen as list elements
function createScores(highScores) {
    scores.classList.remove("hide");
    restartButton.classList.remove("hide");
    highScores.forEach(score => {
        let playerName = document.createElement("li");
        let playerScore = document.createElement("li");
        playerName.innerHTML = score.name;
        playerScore.innerHTML = score.score;
        allNames.appendChild(playerName);
        allScores.appendChild(playerScore);
    });
}
