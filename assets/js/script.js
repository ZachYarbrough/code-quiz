var startQuiz = document.querySelector('.start-quiz');
var startEl = document.querySelector('.start');
var timeEl = document.querySelector('.time');

var count = 90;
timeEl.textContent = 'Time Remaing: ' + count;

var questionNum = 0;

startEl.addEventListener('click', function() {
    var startTime = setInterval(function() {
        count--;
        timeEl.textContent = 'Time Remaing: ' + count;
        if(count <= 0) {
            clearInterval(startTime);
            questionContainer.remove();
        }
    }, 1000);
    startQuiz.remove();
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