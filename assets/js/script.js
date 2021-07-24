var startQuiz = document.querySelector('.start-quiz');
var startEl = document.querySelector('.start');
var timeEl = document.querySelector('.time');

var count = 90;
timeEl.textContent = 'Time Remaing: ' + count;

startEl.addEventListener('click', function() {
    var startTime = setInterval(function() {
        count--;
        timeEl.textContent = 'Time Remaing: ' + count;
        if(count === 0) {
            clearInterval(startTime);
        }
    }, 1000);
    startQuiz.remove();
});