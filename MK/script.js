document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Qué tipo de café se dice que es el más fuerte y se sirve en pequeñas porciones, conocido por su aroma intenso?",
            answers: [
                { text: "Capuchino", correct: false },
                { text: "Esresso", correct: true },
                { text: "Café", correct: false },
                { text: "Expreso", correct: false }
            ]
        },
        {
            question: "En una competencia de comer hamburguesas, si un participante come 3 hamburguesas en 15 minutos, ¿cuántas hamburguesas comería en 1 hora si mantuviera el mismo ritmo?",
            answers: [
                { text: "20", correct: false },
                { text: "10", correct: false },
                { text: "15", correct: false },
                { text: "12", correct: true }
            ]
        },
        {
            question: "Si en una hamburguesa de Panifresh MK hay 3 tipos de quesos, 4 tipos de salsas y 5 ingredientes adicionales, ¿cuántas hamburguesas diferentes podrías crear si eliges exactamente un tipo de cada uno?",
            answers: [
                { text: "90 Combinaciones", correct: false },
                { text: "66 Combinaciones", correct: false },
                { text: "60 Combinaciones", correct: true },
                { text: "33 Combinaciones", correct: false }
            ]
        },
        {
            question: "Soy algo que se derrite al calor, pero no soy hielo. Me encanta acompañar hamburguesas y a veces voy en rebanadas o en rodajas. ¿Qué soy?",
            isTextAnswer: true, // Indica que esta pregunta requiere una respuesta de texto
            correctAnswer: "Queso" // Respuesta correcta
        }
    ];

    let currentQuestionIndex = 0;
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const textAnswerElement = document.getElementById('text-answer');
    const nextButton = document.getElementById('next-btn');

    startGame();

    function startGame() {
        currentQuestionIndex = 0;
        nextButton.classList.add('hidden');
        textAnswerElement.classList.add('hidden'); // Ocultar el campo de texto al inicio
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        if (currentQuestion.isTextAnswer) {
            // Mostrar campo de entrada si es una pregunta de texto
            textAnswerElement.classList.remove('hidden');
            textAnswerElement.value = ""; // Limpiar el campo
            textAnswerElement.focus(); // Focalizar el campo
        } else {
            // Crear botones para preguntas de opción múltiple
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('answer-btn');
                button.dataset.correct = answer.correct;
                button.addEventListener('click', selectAnswer);
                answerButtonsElement.appendChild(button);
            });
        }
    }

    function resetState() {
        nextButton.classList.add('hidden');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === "true";
        setStatusClass(selectedButton, correct);

        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === "true");
        });

        if (questions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hidden');
        } else {
            nextButton.innerText = 'Reiniciar';
            nextButton.classList.remove('hidden');
        }
    }

    function setStatusClass(element, correct) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    textAnswerElement.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const userAnswer = textAnswerElement.value.toLowerCase().trim();
            const currentQuestion = questions[currentQuestionIndex];
            const correct = userAnswer === currentQuestion.correctAnswer.toLowerCase();

            if (correct) {
                alert("¡Correcto!");
            } else {
                alert("Incorrecto. La respuesta correcta es: " + currentQuestion.correctAnswer);
            }

            if (questions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hidden');
            } else {
                nextButton.innerText = 'Reiniciar';
                nextButton.classList.remove('hidden');
            }
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            startGame();
        }
    });
});
