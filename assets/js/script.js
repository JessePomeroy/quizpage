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
startButton.addEventListener("click", function () { // when start button is clicked
    startButton.classList.add("hide"); // adds class of hide which has a display of none
    startQuiz(); // run start quiz 
});

restartButton.addEventListener("click", function () { // when reset button is clicked
    location.reload(); // run start quiz 
});

//functions
function startQuiz() {
    countdown(); // run countdown
    showQuestion(); // run show question
}

function countdown() {
    const interval = setInterval(() => {
        timeLeft--; // subtract 1 from initial time
        timer.textContent = "Timer: " + timeLeft + " seconds"; // add text to timer div
        if (timeLeft <= 0 || complete) { // if timer is 0 or state is complete
            clearInterval(interval); // stop timer
            endQuiz(); // run end quiz
        }
    }, 1000); // 1000 milliseconds
}

function showQuestion() {
    answer.innerHTML = ''; // clear answer div
    let totalCount = questionArray.length; // get total items in array
    let currentQuestion = questionArray[questionCount] // get current question by looking at array and applying the questionCount
    questionContent.innerHTML = currentQuestion.question; // add question to questionContent div
    currentQuestion.choices.forEach(choice => { // get all options for current question
        let option = document.createElement("div"); // create div for option
        option.innerText = choice; // add anwser to choice div
        option.className = "choice"; // add choice class to div
        option.addEventListener("click", () => {  // add event listener of click to div
            check(choice, currentQuestion.answer, totalCount); // run check and send the item clicked, the correct answer, and the total questions
        });
        answer.appendChild(option); // add div to the answer container
    });
}

function check(choice, answer, totalCount) {
    if (choice === answer) { // if the anwser chosen is correct
        alert("Good job dawg")
    } else { // if the anwser chosen is incorrect
        timeLeft = timeLeft - 5
        alert("Nah, you tripping")
    }
    questionCount++; // add 1 to the question count
    if (questionCount === totalCount) { // if question count and total count equal the same then change the state to complete
        complete = true
    } else { // if question count and total count does not equal the same the proceed to next question
        showQuestion();
    }
}

function endQuiz() {
    quiz.classList.add("hide"); // adds class of hide which has a display of none
    var name = prompt("The End! Your score is: " + timeLeft + "\nEnter your initials please:");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // get the high scores from local storage
    if (name) { // if there was input entered in the prompt
        highScores.push({ name: name, score: timeLeft }); // pushes name and score to high scores array
        localStorage.setItem("highScores", JSON.stringify(highScores)); // add array to local storage
        highScores.sort((a, b) => b.score - a.score); // sort by high score
        createScores(highScores); // send new array to create score function
    } else {
        endQuiz(); // if no input was entered then re run function
    }
}

function createScores(highScores) {
    scores.classList.remove("hide"); // removes class of hide 
    restartButton.classList.remove("hide"); // removes class of hide 
    highScores.forEach(score => { // get each entry in the high scores array
        let playerName = document.createElement("li"); // create a list item for name
        let playerScore = document.createElement("li"); // create a list item for score
        playerName.innerHTML = score.name; // add name to playerName div
        playerScore.innerHTML = score.score; // add score to playerName div
        allNames.appendChild(playerName); // append li to unordered name list
        allScores.appendChild(playerScore); // append li to unordered score list
    });
}