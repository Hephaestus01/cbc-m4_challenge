// Array of Questions to pull from
var questions = [
    {
        qId: 0,
        questionPrompt: "Which of the following keywords is used to define a variable in JavaScript?",
        choice: ["var", "const", "function", "if"],
        verify: [1, 0, 0, 0]
    },
    {
        qId: 1,
        questionPrompt: "Which of the following represents and empty array?",
        choice: ["{ }", "[ ]", "< >", "''"],
        verify: [0, 1, 0, 0]
    },
    {
        qId: 2,
        questionPrompt: "How is an interval timer stopped in JavaScript?",
        choice: ["clearTimer", "clearTimeout", "clearInterval", "None of the above"],
        verify: [0, 0, 1, 0]
    },
    {
        qId: 3,
        questionPrompt: "How is a comment written in JavaScript",
        choice: ["/* */", "#", "$ $", "//"],
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
    listSection.className = "list-section";
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
    //  validation for right or wrong
    var selection = parseInt(event.target.getAttribute("verify"));
    event.target.id = "list-choice-clicked";
    if (selection === 0) {
        // create "WRONG" element
        var wrongEl = document.createElement("p");
        wrongEl.className = "wrong-element validation";
        wrongEl.innerHTML = "WRONG!";
        document.body.appendChild(wrongEl);
        timeLeft = timeLeft - 5;
    }
    else {
        // create "RIGHT" element
        var rightEl = document.createElement("p");
        rightEl.className = "right-element validation";
        rightEl.innerHTML = "RIGHT!";
        document.body.appendChild(rightEl);
    }
    // create NEXT button
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
            localStorage.setItem("final-time", JSON.stringify(timeLeft));
        }
    });
};

// Show the final score the player achieved with new HTML components
var showFinalScore = function () {
    var timer = document.getElementById("timer");
    timer.remove();
    var removeViewScores = document.getElementById("view-scores");
    removeViewScores.remove();
    clickCounter = 0;

    var finalScoreWrapper = document.createElement("div")
    finalScoreWrapper.id = "score-wrapper";

    var finishMessage = document.createElement("div");
    finishMessage.id = "finish-message";
    finishMessage.innerHTML = "Finished!";

    var userScoreMessage = document.createElement("div");
    userScoreMessage.id = "user-score-message";
    userScoreMessage.innerHTML = "Your final score is " + timeLeft;

    var userInits = document.createElement("div");
    userInits.id = "user-inits";
    userInits.innerHTML = "<input type='text' name='initials' placeholder='Enter Initials' />"

    var submitInits = document.createElement("button");
    submitInits.className = "btn";
    submitInits.id = "submit-button";
    submitInits.textContent = "Submit";
    // when user clicks submit button, make sure it can only submit once by tracking click, and then pass to submitHandler()
    submitInits.addEventListener("click", function () {
        clickCounter++;
        if (clickCounter === 1) {
            submitHandler();
        }
    });

    finalScoreWrapper.appendChild(finishMessage);
    finalScoreWrapper.appendChild(userScoreMessage);
    finalScoreWrapper.appendChild(userInits);
    finalScoreWrapper.appendChild(submitInits);
    document.body.appendChild(finalScoreWrapper);
};

// submitHandler() will log the score data and track it via localStorage
var submitHandler = function () {
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
        alert("Enter name or initials between 3 and 10 characters to continue...");
        clickCounter = 0;
        return playerInits;
    } else {
        playerArray.push(playerInits);
    }
    var playerScore = JSON.parse(localStorage.getItem("final-time"));
    highScoreArray.push(playerScore);

    localStorage.setItem("high-scores", JSON.stringify(highScoreArray));
    localStorage.setItem("players", JSON.stringify(playerArray));

    createHighScoreSheet(highScoreArray, playerArray);
};

// creates the score sheet by passing arrays and then combining them in 2D array to pull from
var createHighScoreSheet = function (highScoreArray, playerArray) {
    var highScoreTable = highScoreArray.map(function (x, i) {
        return [x, playerArray[i]];
    })

    highScoreTable.sort(function (a, b) {
        return b[0] - a[0];
    });

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
        scoreEl.innerHTML = highScoreTable[i][0];

        var playerEl = document.createElement("div");
        playerEl.id = "player";
        playerEl.className = "high-score-item";
        playerEl.innerHTML = highScoreTable[i][1];

        document.body.appendChild(highScoreRow);
        highScoreRow.appendChild(scoreEl);
        highScoreRow.appendChild(playerEl);
    }

    var finalOptions = document.createElement("div");
    finalOptions.id = "final-options";
    document.body.appendChild(finalOptions);

    var startOver = document.createElement("button");
    startOver.id = "go-back-button";
    startOver.className = "btn";
    startOver.textContent = "Try Again";
    finalOptions.appendChild(startOver);
    startOver.addEventListener("click", function () {
        location.reload();
    });

    var clearScores = document.createElement("button");
    clearScores.id = "clear-scores-button";
    clearScores.classList = "btn"
    clearScores.textContent = "Clear Scores"
    finalOptions.appendChild(clearScores);
    clearScores.addEventListener("click", function () {
        localStorage.clear();
        var highScoreArray = [];
        var playerArray = [];
        while (document.body.firstChild) {
            document.body.removeChild(document.body.lastChild);
        }
        createHighScoreSheet(highScoreArray, playerArray);
    })
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

    // view scores and remove all other content on page
    var viewScoreEl = document.querySelector("#view-scores");
    viewScoreEl.addEventListener("click", function () {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.lastChild);
        }
        createHighScoreSheet(highScoreArray, playerArray);
    });
};

// start the quiz
var startQuiz = function () {
    var startButton = document.querySelector("#start");
    var introSection = document.getElementById("intro");
    startButton.addEventListener("click", function () {
        introSection.remove();
        createQuestion(i);
        startTime();
        viewHighScores();
    });
};

// start the timer
var startTime = function () {
    document.querySelector("#timer").innerHTML = "Time: " + timeLeft;

    var countDown = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            document.querySelector("#timer").innerHTML = "Time: " + timeLeft;
        } else if (timeLeft === 0) {
            console.log(timeLeft);
            localStorage.setItem("final-time", JSON.stringify(timeLeft));
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