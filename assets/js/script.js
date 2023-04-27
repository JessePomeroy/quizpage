//timer
let timeLeft = 60;
let timer = document.getElementById("timer");
let startTime = new Date();
//progress
let questionsLeft = document.querySelector(".number-of-questions");
let questionContent = document.getElementById("question");

let questionCount = 0;
let questionEl = document.getElementById("questions");
let answerEl = document.getElementById("answer");
let score = document.querySelector(".score");
let questionTotal = 4;
let quiz = document.getElementById("quiz");
let scores = document.getElementById("scores");
let allNames = document.getElementById("allNames");
let allScores = document.getElementById("allScores");
let splash = document.getElementById("ready");

//buttons
let startButton = document.getElementById("startbutton");
let restartButton = document.getElementById("restart");
let nextButton = document.getElementById("next-button");

//local
let losses = localStorage.getItem("losses");
let wins = localStorage.getItem("wins");

if (losses === null) {
    losses = 0;
}

if (wins === null) {
    wins = 0;
}

// questions taken from w3 schools javascipt quiz
const questionArray =
    [
        {
            question: "inside which html element do we put the javascript?",
            choices: ["<js>", "<javascript>", "<script>", "<scripting>"],
            answer: "<script>"
        },
        {
            question: "what is the correct javascript syntax to change the content of the html element below?: <p id='demo'>this is a demonstration.</p>",
            choices: ["#demo.innterHTML = 'Hello world!';", "docutment.getElementByName('p').innerHTML = 'Hello World!';", "document.getElementById('demo').innerHTML = 'Hello world!';", "document.getElement('p').innerHTML = 'Hello world!';"],
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
        }
    ];

restartButton.addEventListener("click", () => {
    window.location.reload();
});

startButton.addEventListener("click", function () {
    let countdownTimer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            if (timeLeft === 1) {
                document.getElementById("timeLeft").textContent = "Timer: " + timeLeft + " second";
            } else {
                document.getElementById("timeLeft").textContent = "Timer: " + timeLeft + " seconds";
            }
        } else {
            clearInterval(countdownTimer);
            alert("Quiz timer is up");
            end();
        }
    }, 1000);

    startQ();
});


function startQ() {
    console.log("starting quiz...");
    startButton.style.display = "none";
    splash.style.display = "none";
    showQuestion();
}

function showQuestion() {
    console.log(questionArray);
    let qEl = questionArray[questionCount];
    qEl.textContent = qEl.question;
    console.log(questionContent)
    questionContent.textContent = qEl.question;

    answerEl.innerHTML = "";

    qEl.choices.forEach(choice => {

        let button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => {
            check(choice, qEl.answer);
        });
        answerEl.appendChild(button);
    });
}

function check(choice, answer) {
    console.log(choice, answer);
    if (choice === answer) {
        alert("correct!");
    } else {
        alert("wrong!");
        timeLeft = timeLeft - 5;
    }

    let newQuestion = questionCount++;
    console.log(newQuestion)
    console.log(questionArray.length)
    if (newQuestion < 3) {
        showQuestion();
    } else {
        end();
    }
}

function end() {
    var name = prompt("Thanks for playing! You Scored: " + timeLeft + "\nPlease enter your initials:");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name: name, score: timeLeft });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    quiz.style.display = "none";
    scores.style.display = "block";
    createScores(highScores);

    console.log(highScores);
}

function createScores(highScores) {
    scores.style.display = "block";
    highScores.forEach(score => {
        let playerName = document.createElement("div");
        let playerScore = document.createElement("div");
        playerName.className = "names";
        playerScore.className = "score";
        playerName.innerHTML = score.name;
        playerScore.innerHTML = score.score;
        allNames.appendChild(playerName);
        allScores.appendChild(playerScore);
        console.log(playerName);
        console.log(playerScore);
    });

}