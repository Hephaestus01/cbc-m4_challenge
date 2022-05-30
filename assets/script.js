var questions = [
    {
        qId: 0,
        questionPrompt: "Question 1",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [1, 0, 0, 0]
    },
    {
        qId: 1,
        questionPrompt: "Question 2",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 1, 0, 0]
    },
    {
        qId: 2,
        questionPrompt: "Question 3",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 0, 1, 0]
    },
    {
        qId: 3,
        questionPrompt: "Question 4",
        choice: ["Answer A", "Answer B", "Answer C", "Answer D"],
        verify: [0, 0, 0, 1]
    }
];
var clickCounter = 0;
var i = 0
var timeLeft = 60;
var playerScore = timeLeft;


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
                i++;
                selectHandler(event, i);
            }
        });
    };
    document.body.appendChild(questionSection);
};

// for handling each answer choice click event
var selectHandler = function (event, i) {
    // need validation for right or wrong
    var selection = parseInt(event.target.getAttribute("verify"));
    if (selection === 0) {
        var wrongEl = document.createElement("p");
        wrongEl.className = "wrong-element";
        wrongEl.className = "validation";
        wrongEl.innerHTML = "WRONG!";
        document.body.appendChild(wrongEl);
        timeLeft = timeLeft - 5;
    }
    else {
        // create "RIGHT" element
        var rightEl = document.createElement("p");
        rightEl.className = "right-element";
        rightEl.className = "validation";
        rightEl.innerHTML = "RIGHT!";
        document.body.appendChild(rightEl);
    }
    var nextButton = document.createElement("button");
    nextButton.className = "btn next-button";
    nextButton.innerHTML = "NEXT QUESTION";
    document.body.appendChild(nextButton);
    nextButton.addEventListener("click", function () {
        clickCounter = 0;
        var removeQuestion = document.querySelector(".question-section");
        removeQuestion.remove();
        var validationStatement = document.querySelector(".validation");
        validationStatement.remove();
        nextButton.remove();
        if (i < questions.length) {
            createQuestion(i);
        } else {
            showFinalScore();
        }
    });
};


var showFinalScore = function () {
    console.log(timeLeft);
    var timer = document.getElementById("timer");
    timer.remove();

    var finalScoreWrapper = document.createElement("div")
    finalScoreWrapper.id = "score-wrapper";

    var finishMessage = document.createElement("div");
    finishMessage.id = "finish-message";
    finishMessage.innerHTML = "All Done!";

    var userScoreMessage = document.createElement("div");
    userScoreMessage.id = "user-score-message";
    userScoreMessage.innerHTML = "Your final score is " + timeLeft;

    var userInits = document.createElement("div");
    userInits.id = "user-inits";
    userInits.innerHTML = "Enter initials <input type='text' name='initials' placeholder='Enter Initials' />"

    var submitInits = document.createElement("button");
    submitInits.className = "btn";
    submitInits.id = "submit-button";
    submitInits.textContent = "Submit";
    submitInits.addEventListener("click", function () {
        submitHandler();
    });

    finalScoreWrapper.appendChild(finishMessage);
    finalScoreWrapper.appendChild(userScoreMessage);
    finalScoreWrapper.appendChild(userInits);
    finalScoreWrapper.appendChild(submitInits);
    document.body.appendChild(finalScoreWrapper);
};

var submitHandler = function () {
    // store initials to new array
    scoreArray = [];
    
};


// start the quiz
var startQuiz = function () {
    var startButton = document.querySelector("#start");
    var introSection = document.getElementById("intro");
    startButton.addEventListener("click", function () {
        introSection.remove();
        createQuestion(i);
        startTime(i);
    });
};

var startTime = function (i) {
    document.querySelector("#timer").innerHTML = "Time: " + timeLeft;

    var countDown = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            document.querySelector("#timer").innerHTML = "Time: " + timeLeft;
            // console.log(timeLeft);
            // console.log(i);
        } else if (timeLeft === 0) {
            console.log(timeLeft);
            clearInterval(countDown);
            var removeQuestion = document.querySelector(".question-section");
            removeQuestion.remove();
            console.log("show score", timeLeft);
            showFinalScore();
        }
    }, 1000);
    // var finalExist = document.getElementById('score-wrapper');
    // if (finalExist.length) {
    //     console.log("done");
    // }

};



startQuiz();