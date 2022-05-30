var questions = [
    {
        qId: 0,
        questionPrompt: "Question 1",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 1, 0, 0]
    },
    {
        qId: 1,
        questionPrompt: "Question 2",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 0, 1, 0]
    },
    {
        qId: 2,
        questionPrompt: "Question 3",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 0, 1, 0]
    },
    {
        qId: 4,
        questionPrompt: "Question 4",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 0, 0, 1]
    }
];
var clickCounter = 0;

// create the question HTML elements
var createQuestion = function (i) {
    var questionSection = document.createElement("div");
    questionSection.className = "question-section";
    questionSection.setAttribute("question-id", i);

    var askQuestion = document.createElement("p");
    askQuestion.innerHTML = questions[i].questionPrompt;
    questionSection.appendChild(askQuestion);

    var listSection = document.createElement("ol");
    questionSection.appendChild(listSection);

    for (var j = 0; j < questions[i].choice.length; j++) {
        var listChoice = document.createElement("li");
        listChoice.id = "list-choice";
        listChoice.setAttribute("list-id", j);
        listChoice.setAttribute("verify", questions[i].verify[j]);
        listChoice.innerHTML = questions[i].choice[j];
        listSection.appendChild(listChoice);
        listChoice.addEventListener("click", function (event) {
            clickCounter++;
            if (clickCounter === 1) {
                console.log("1");
                selectHandler(event);
            }
        });
    };

    i++;
    document.body.appendChild(questionSection);
};


var selectHandler = function (event) {
    // need validation for right or wrong
    var selection = parseInt(event.target.getAttribute("verify"));
    console.log(selection);
    if (selection === 0) {
        var wrongEl = document.createElement("p");
        wrongEl.className = "wrong-element";
        wrongEl.innerHTML = "WRONG!";
        document.body.appendChild(wrongEl);
    }
    else {
        // create "RIGHT" element
        var rightEl = document.createElement("p");
        rightEl.className = "right-element";
        rightEl.innerHTML = "RIGHT!";
        document.body.appendChild(rightEl);
    }
    var nextButton = document.createElement("button");
    nextButton.className = "btn";
    nextButton.innerHTML = "NEXT QUESTION";
    document.body.appendChild(nextButton);

    // var disableChoices = document.getElementsByClassName("question-section");
    // disableChoices.setAttribute("disabled", "");
};

// what happens to timer after validated

// go to next question >> nextHandler

// disable buttons after first click


// start the quiz
var startQuiz = function () {
    var startButton = document.querySelector("#start");
    var introSection = document.getElementById("intro");
    var i = 0
    startButton.addEventListener("click", function () {
        introSection.remove();
        createQuestion(i);
    });
};

startQuiz();