const squaresContainer = document.getElementById("squares");
const resetButton = document.getElementById("reset-button");
const quizModal = document.getElementById("quiz-modal");
const closeButton = document.getElementById("close-button");
const showHintsButton = document.getElementById("show-hints-button");
const answersContainer = document.getElementById("answers");
const questionElement = document.getElementById("question");

let questions = [
    { question: "Jakie jest największe jezioro w Polsce?", answers: ["Śniardwy", "Mamry", "Hańcza", "Drawsko"], correct: 0 },
    { question: "Jaki jest najdłuższy dzień w roku?", answers: ["21 czerwca", "22 czerwca", "21 marca", "23 września"], correct: 0 },
    // Dodaj więcej pytań
];

function createSquares() {
    for (let i = 1; i <= 50; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = i;
        square.addEventListener("click", () => openQuiz(i - 1, square));
        squaresContainer.appendChild(square);
    }
}

function openQuiz(index, square) {
    if (square.classList.contains("clicked")) return;

    const questionData = questions[index % questions.length];
    questionElement.textContent = questionData.question;
    answersContainer.innerHTML = "";
    answersContainer.style.display = "none";

    questionData.answers.forEach((answer, i) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.textContent = answer;
        answerDiv.addEventListener("click", () => {
            checkAnswer(answerDiv, i, questionData.correct, square);
        });
        answersContainer.appendChild(answerDiv);
    });

    quizModal.classList.add("active");
}

function checkAnswer(element, index, correctIndex, square) {
    if (index === correctIndex) {
        element.classList.add("correct");
    } else {
        element.classList.add("incorrect");
    }
    square.classList.add("clicked");
}

showHintsButton.addEventListener("click", () => {
    answersContainer.style.display = "block";
});

closeButton.addEventListener("click", () => {
    quizModal.classList.remove("active");
    answersContainer.style.display = "none";
});

resetButton.addEventListener("click", () => {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.remove("clicked");
    });
});

createSquares();
