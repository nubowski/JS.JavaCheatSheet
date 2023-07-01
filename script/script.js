

// container + buttons
const questionContainer = document.getElementById("question-container");
const collapseButton = document.getElementById("collapse-button");
const expandButton = document.getElementById("expand-button");

// qna from data
fetch('/data.txt')
    .then(response => response.text())
    .then(text => {
        console.log(text);
        // magic here
        const lines = text.split('\n');
        let data = [];
        let question, answer;
        lines.forEach(line => {
            line = line.trim(); // remove wss (?is the problem)
            if (line.match(/^\d+\./)) { // If line starts with a number and dot, it's a q
                if (question) { // if q is not undefined -> Q&A to push to data (I hope)
                    data.push({
                        q: question.trim(),
                        a: answer.trim()
                    });
                }
                // Reset for the next Q&A
                question = line.split('. ')[1];
                answer = '';
            } else if (line.startsWith('- ')) { // If line starts with "- ", it's part of the a
                answer += line + '\n';
            }
        });
        // last Q&A
        data.push({
            q: question.trim(),
            a: answer.trim()
        });
        console.log(data);

        // data array is here now
        data.forEach((item) => {
            const questionItem = createQuestionItem(item.q, item.a);
            questionContainer.appendChild(questionItem);
        });
    });

function createQuestionItem(question, answer) {
    const questionItem = document.createElement("div");
    questionItem.classList.add("question-item");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = question;
    questionItem.appendChild(questionTitle);

    const answerText = document.createElement("p");
    answerText.innerHTML = answer.replace(/\n/g, '<br />');
    answerText.classList.add("answer");
    answerText.style.display = "none"; // hide the answer initially
    questionItem.appendChild(answerText);

    questionTitle.addEventListener("click", function() {
        answerText.style.display = answerText.style.display === "none" ? "block" : "none";
    });

    return questionItem;
}

// open all close all buttons
collapseButton.addEventListener("click", function() {
    const answers = document.querySelectorAll(".answer");
    answers.forEach((item) => {
        item.style.display = "none";
    });
});

expandButton.addEventListener("click", function() {
    const answers = document.querySelectorAll(".answer");
    answers.forEach((item) => {
        item.style.display = "block";
    });
});

