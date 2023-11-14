const questions = [
    {
        question: "Кто является рекордсменом по количеству забитых голов в истории чемпионатов мира по футболу?",
        answers: [
            { text: "Lionel Messi", correct: false },
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Pelé", correct: false },
            { text: "Miroslav Klose", correct: true },
        ]
    },
    {
        question: "Какой клуб выиграл больше всех Лигу чемпионов УЕФА (Кубок чемпионов)?",
        answers: [
            { text: "Real Madrid", correct: true },
            { text: "Barcelona", correct: false },
            { text: "AC Milan", correct: false },
            { text: "Bayern Munich", correct: false },
        ]
    },
    {
        question: "Кто был назван лучшим футболистом мира по версии FIFA в 2021 году?",
        answers: [
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Lionel Messi", correct: true },
            { text: "Robert Lewandowski", correct: false },
            { text: "Kevin De Bruyne", correct: false },
        ]
    },
    {
        question: "В каком году проводился первый чемпионат мира по футболу?",
        answers: [
            { text: "1928", correct: false },
            { text: "1934", correct: false },
            { text: "1930", correct: true },
            { text: "1926", correct: false },
        ]
    },
    {
        question: "Какая страна является рекордсменом по количеству побед в Кубке Америки (Copa America)?",
        answers: [
            { text: "Аргентина", correct: false },
            { text: "Уругвай", correct: false },
            { text: "Бразилия", correct: true },
            { text: "Колумбия", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (element.correct) {
            button.dataset.correct = element.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Вы набрали ${score} из ${questions.length} баллов!`;
    nextButton.innerHTML = "Сыграть снова";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", function() {
        restartQuiz();
        location.reload();
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", handleNextButton);


startQuiz();
