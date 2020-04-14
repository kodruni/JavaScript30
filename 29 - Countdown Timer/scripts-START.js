let countdown; //create var to store interval
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer (seconds) {
  //clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); //when the timer started; new static method
  const then = now + seconds * 1000; //now is on milisecs
  // console.log({now, then});
  displayTimeLeft(seconds);
  displayEndTime(then);

  //now, every single sec we need to display the amount of time left
  countdown = setInterval(() => {
    const secondsLeft = Math.round(then - Date.now()) / 1000;
    //check if we should stop it
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
  // console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTime() {
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  // console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTime));
  document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins =  this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});