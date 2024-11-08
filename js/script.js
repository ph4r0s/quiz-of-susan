document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const questionPanel = document.getElementById("questionPanel");
    const questionText = document.getElementById("questionText");
    const hintButton = document.getElementById("hintButton");
    const answersContainer = document.getElementById("answers");
    const closeButton = document.getElementById("closeButton");
    const resetButton = document.getElementById("resetButton");

    const squares = [];
    let questions = [
        {
            question: "In mathematics, what is the smallest prime number greater than 100?",
            answers: ["101", "103", "107", "109"],
            correctAnswer: 0
        },
        {
            question: "What is the powerhouse of the cell?",
            answers: ["Ribosome", "Mitochondrion", "Nucleus", "Chloroplast"],
            correctAnswer: 1
        },
        // Dodaj tutaj więcej pytań...
    ];

    // Inicjalizacja kwadratów
    for (let i = 0; i < 50; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerText = i + 1;
        square.addEventListener("click", () => handleSquareClick(i));
        grid.appendChild(square);
        squares.push(square);
    }

    // Kliknięcie w kwadrat
    function handleSquareClick(index) {
        const question = questions[index % questions.length];
        questionText.innerText = question.question;
        answersContainer.innerHTML = "";
        question.answers.forEach((answer, i) => {
            const answerButton = document.createElement("button");
            answerButton.innerText = answer;
            answerButton.classList.add("answerButton");
            answerButton.addEventListener("click", () => checkAnswer(i, question.correctAnswer, index));
            answersContainer.appendChild(answerButton);
        });
        hintButton.style.display = "block";
        answersContainer.classList.add("hidden");
        questionPanel.classList.add("active");
    }

    // Sprawdzenie odpowiedzi
    function checkAnswer(selectedAnswer, correctAnswer, index) {
        const answerButtons = answersContainer.querySelectorAll(".answerButton");
        answerButtons.forEach((button, i) => {
            if (i === correctAnswer) button.classList.add("correct");
            else if (i === selectedAnswer) button.classList.add("incorrect");
        });
        squares[index].classList.add("inactive");
        squares[index].removeEventListener("click", () => handleSquareClick(index));
    }

    // Obsługa przycisku "Pokaż podpowiedzi"
    hintButton.addEventListener("click", () => {
        answersContainer.classList.remove("hidden");
        hintButton.style.display = "none";
    });

    // Obsługa przycisku zamknięcia
    closeButton.addEventListener("click", () => {
        questionPanel.classList.remove("active");
    });

    // Obsługa resetowania
    resetButton.addEventListener("click", () => {
        squares.forEach(square => {
            square.classList.remove("inactive");
            square.addEventListener("click", () => handleSquareClick(Array.from(squares).indexOf(square)));
        });
    });
});
