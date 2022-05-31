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
    var timer = document.getElementById("timer");
    timer.remove();
    clickCounter = 0;

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
    submitInits.addEventListener("click", function (event) {
        clickCounter++;
        if (clickCounter === 1) {
            submitHandler(event);
        }
    });

    finalScoreWrapper.appendChild(finishMessage);
    finalScoreWrapper.appendChild(userScoreMessage);
    finalScoreWrapper.appendChild(userInits);
    finalScoreWrapper.appendChild(submitInits);
    document.body.appendChild(finalScoreWrapper);
};

var submitHandler = function (event) {
    // get existing arrays from localStorage or create new array
    if (localStorage.getItem("high-scores") != null) {
        var highScoreArray = JSON.parse(localStorage.getItem("high-scores"));
        var playerArray = JSON.parse(localStorage.getItem("players"));
        console.log("localStorage loaded ", highScoreArray);
        console.log("localStorage loaded ", playerArray);
    } else {
        var highScoreArray = [];
        var playerArray = [];
    }

    // store initials to new variable
    var playerInits = (document.querySelector("input[name='initials']").value);
    if (!playerInits || playerInits.length > 10 || playerInits.length < 3) {
        alert("Enter name or initials between 3 and 10 characters to continue...")
        return playerInits;
    } else {
        playerArray.push(playerInits);
    }
    var playerScore = timeLeft;
    highScoreArray.push(playerScore);

    localStorage.setItem("high-scores", JSON.stringify(highScoreArray));
    localStorage.setItem("players", JSON.stringify(playerArray));

    console.log(highScoreArray);
    console.log(playerArray);

    createHighScoreSheet(highScoreArray, playerArray);
};

var createHighScoreSheet = function (highScoreArray, playerArray) {
    var scoreTableTitle = document.createElement("div");
    scoreTableTitle.id = "score-title";
    scoreTableTitle.innerHTML = "HIGH SCORES";
    document.body.appendChild(scoreTableTitle);

    for (var i = 0; i < highScoreArray.length; i++) {
        var highScoreRow = document.createElement("div");
        highScoreRow.id = ("high-score-row");

        var scoreEl = document.createElement("div");
        scoreEl.id = "score";
        scoreEl.className = "high-score-item";
        scoreEl.innerHTML = highScoreArray[i];

        var playerEl = document.createElement("div");
        playerEl.id = "player";
        playerEl.className = "high-score-item";
        playerEl.innerHTML = playerArray[i];

        document.body.appendChild(highScoreRow);
        highScoreRow.appendChild(scoreEl);
        highScoreRow.appendChild(playerEl);
    }
};

var viewHighScores = function () {
    if (localStorage.getItem("high-scores") != null) {
        var highScoreArray = JSON.parse(localStorage.getItem("high-scores"));
        var playerArray = JSON.parse(localStorage.getItem("players"));
        console.log("localStorage loaded ", highScoreArray);
        console.log("localStorage loaded ", playerArray);
    } else {
        var highScoreArray = [];
        var playerArray = [];
    }
    var viewScoreEl = document.querySelector("#view-scores");
    viewScoreEl.addEventListener("click", function () {
        console.log("hi");
        while (document.body.firstChild) {
            document.body.removeChild(document.body.lastChild);
        }
        createHighScoreSheet(highScoreArray, playerArray);
    });
    // when clicked, first remove everything else from page

    // then add High Score table

};


// start the quiz
var startQuiz = function () {
    var startButton = document.querySelector("#start");
    var introSection = document.getElementById("intro");
    startButton.addEventListener("click", function () {
        introSection.remove();
        createQuestion(i);
        startTime(i);
        viewHighScores();
    });
};

var startTime = function (i) {
    document.querySelector("#timer").innerHTML = "Time: " + timeLeft;

    var countDown = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            document.querySelector("#timer").innerHTML = "Time: " + timeLeft;
        } else if (timeLeft === 0) {
            console.log(timeLeft);
            clearInterval(countDown);
            var removeQuestion = document.querySelector(".question-section");
            removeQuestion.remove();
            console.log("show score", timeLeft);
            showFinalScore();
        }
    }, 1000);
};

startQuiz();
viewHighScores();