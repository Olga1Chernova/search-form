import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates <= this.defaultDate) {
          Notiflix.Notify.failure("Please choose a date in the future");
          refs.startButton.disabled = true;
      } else
        timer = selectedDates[0].getTime();
        refs.startButton.disabled = false;
  },
};

const datetimePicker = flatpickr("#datetime-picker", options);

let timer = null;

const refs = {
    startButton: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
    const timerTimeLeftInterval = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = timer - currentTime;

        if (timeLeft <= 0) {
            clearInterval(timerTimeLeftInterval);
            return;
        } 
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        getUserSelectedTime({ days, hours, minutes, seconds });
    }, 1000)
}

function getUserSelectedTime({days,hours,minutes,seconds}){
    refs.days.textContent = `${days}`;  
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}