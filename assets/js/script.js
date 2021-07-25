var startQuiz = document.querySelector('.start-quiz');
var startEl = document.querySelector('.start');
var timeEl = document.querySelector('.time');

var count = 90;
timeEl.textContent = 'Time Remaing: ' + count;

var questionNum = 0;

var highScores = JSON.parse(localStorage.getItem("scores")); 
if(highScores === null) highScores = [];
startEl.addEventListener('click', function() {
    var startTime = setInterval(function() {
        count--;
        timeEl.textContent = 'Time Remaing: ' + count;
        if(count <= 0 || questionNum >= 5) {
            clearInterval(startTime);
            removeScreens();
            count = 0;
            createFinish();
        }
    }, 1000);
    removeScreens();
    createQuestion();
});

var questionContainer = document.createElement('div');
questionContainer.classList.add('container');
var questionEl = document.createElement('h1');
var answerList = document.createElement('div');
answerList.classList.add('answer-container');
var answer1 = document.createElement('button');
var answer2 = document.createElement('button');
var answer3 = document.createElement('button');
var answer4 = document.createElement('button');
var questionStatusEl = document.createElement('p');
questionStatusEl.classList.add('question-status');

var createQuestion = function() {
    document.querySelector('main').append(questionContainer);
    questionContainer.append(questionEl);
    questionContainer.append(answerList);
    answerList.append(answer1);
    answerList.append(answer2);
    answerList.append(answer3);
    answerList.append(answer4);
    questionContainer.append(questionStatusEl);
    newQuestion();
};

var wrongAnswer = function () {
    questionStatusEl.innerHTML = 'Wrong!';
    count -= 5;
    timeEl.textContent = 'Time Remaing: ' + count;
}

var correctAnswer = function () {
    questionStatusEl.innerHTML = 'Correct!';
    questionNum++;
    newQuestion();
}

var newQuestion = function() {
    if(questionNum === 0) {

        questionEl.innerHTML = 'What can you put in an array?';

        answer1.innerHTML = 'Booleans';
        answer2.innerHTML = 'Other Arrays';
        answer3.innerHTML = 'Strings';
        answer4.innerHTML = 'All of the Above';

        answer1.addEventListener('click', wrongAnswer);
        answer2.addEventListener('click', wrongAnswer);
        answer3.addEventListener('click', wrongAnswer);
        answer4.addEventListener('click', correctAnswer);
    } else if(questionNum === 1) {

        answer1.removeEventListener('click', wrongAnswer);
        answer2.removeEventListener('click', wrongAnswer);
        answer3.removeEventListener('click', wrongAnswer);
        answer4.removeEventListener('click', correctAnswer);

        questionEl.innerHTML = 'How do you write an AND in an if/else statement?';

        answer1.innerHTML = 'and';
        answer2.innerHTML = 'AND';
        answer3.innerHTML = '&&';
        answer4.innerHTML = '&';

        answer1.addEventListener('click', wrongAnswer);
        answer2.addEventListener('click', wrongAnswer);
        answer3.addEventListener('click', correctAnswer);
        answer4.addEventListener('click', wrongAnswer);
    } else if (questionNum === 2) {

        answer1.removeEventListener('click', wrongAnswer);
        answer2.removeEventListener('click', wrongAnswer);
        answer3.removeEventListener('click', correctAnswer);
        answer4.removeEventListener('click', wrongAnswer);

        questionEl.innerHTML = 'How do you write an OR in an if/else statement?';

        answer1.innerHTML = '||';
        answer2.innerHTML = 'or';
        answer3.innerHTML = '$$';
        answer4.innerHTML = 'OR';

        answer1.addEventListener('click', correctAnswer);
        answer2.addEventListener('click', wrongAnswer);
        answer3.addEventListener('click', wrongAnswer);
        answer4.addEventListener('click', wrongAnswer);
    }
}

var finishScreen = document.createElement('div');

var createFinish = function() {
    finishScreen.classList.add('container');
    var finishTitleEl = document.createElement('h1');
    var finishText = document.createElement('p');
    var inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    var inputText = document.createElement('p');
    var initialInput = document.createElement('input');
    initialInput.setAttribute('type', 'text');
    initialInput.setAttribute('name', 'initial');
    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'submit');
    submit.classList.add('btn');
    
    document.querySelector('main').append(finishScreen);
    finishScreen.append(finishTitleEl);
    finishScreen.append(finishText);
    finishScreen.append(inputContainer);
    inputContainer.append(inputText);
    inputContainer.append(initialInput);
    inputContainer.append(submit);

    finishTitleEl.innerHTML = 'All Done!';
    finishText.innerHTML = 'Your Score is: ' + (questionNum * 5);

    inputText.innerHTML = 'Enter your Initials: ';

    submit.addEventListener('click', function() {
        highScores.push({
            'initial': initialInput.value,
            'highscore': questionNum * 5
        });
        localStorage.setItem('scores', JSON.stringify(highScores));

        removeScreens();
        createHighScore();
    });
}

var highScoreContainer = document.createElement('div');

var createHighScore = function () {
    removeScreens();
    highScoreContainer.classList.add('container');
    var highScoreEl = document.createElement('ul');
    var backToStart = document.createElement('button');

        
    document.querySelector('main').append(highScoreContainer);
    highScoreContainer.append(highScoreEl);
    for(var i = 0; i < highScores.length; i++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = highScores[i].initial + ' ' + highScores[i].highscore;
        highScoreEl.append(newLi);
    }
    highScoreContainer.append(backToStart);
    backToStart.innerHTML = 'Back to Start';

    backToStart.addEventListener('click', function() {
        location.reload();
    });
}

var removeScreens = function() {
    if(startQuiz) startQuiz.remove();
    if(finishScreen) finishScreen.remove();
    if(questionContainer) questionContainer.remove();
    if(highScoreContainer) highScoreContainer.remove();
}

var viewScores = document.querySelector('.high-scores');

viewScores.addEventListener('click', createHighScore);