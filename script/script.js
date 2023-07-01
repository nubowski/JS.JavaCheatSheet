// Загрузка данных с вопросами и ответами
const data = [
    { question: "Что такое JVM?", answer: "Виртуальная машина Java для исполнения байт-кода." },
    { question: "Чем отличаются интерфейсы от абстрактных классов?", answer: "Интерфейсы: только абстрактные методы, множественное наследование, нет состояния." },
    // Добавьте остальные вопросы и ответы
];

// Получение шаблона и контейнера
const questionTemplate = document.getElementById("question-template");
const questionContainer = document.getElementById("question-container");

// Создание вопросов и ответов на основе данных
data.forEach((item) => {
    const clone = document.importNode(questionTemplate.content, true);
    clone.querySelector(".question").textContent = item.question;
    clone.querySelector(".answer").textContent = item.answer;
    questionContainer.appendChild(clone);
});