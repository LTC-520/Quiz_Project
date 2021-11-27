const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Who played Wolverine?",
    choice1: "Ryan Reynolds",
    choice2: "Jack Manhugh",
    choice3: "Robert Downey Jr.",
    choice4: "Hugh Jackman",
    answer: 4
  },
  {
    question:
      "In which US city is Broadway located?",
    choice1: "San Francisco",
    choice2: "Los Angeles",
    choice3: "New York City",
    choice4: "Chicago",
    answer: 3
  },
  {
    question: "Who was the messenger of the gods?",
    choice1: "Hercules",
    choice2: "Hermes",
    choice3: "Aries",
    choice4: "Athena",
    answer: 2
  }
  ,
  {
    question: "Which organ is responsible for regulating metabolism?",
    choice1: "Lungs",
    choice2: "Heart",
    choice3: "Liver",
    choice4: "Appendix",
    answer: 1
  }
  ,
  {
    question: "Pancakes are a food item of what type of cuisine?",
    choice1: "Belgium",
    choice2: "American",
    choice3: "French",
    choice4: "South American",
    answer: 2
  }
  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();