// *
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// ? // Посилання та дефолтні налаштування ;
const dataTimePickerUrl = document.querySelector('input#datetime-picker');
const counterStartBtnUrl = document.querySelector('button[data-start]');
const urls = {
  timerDaysSpan: document.querySelector('span[data-days]'),
  timerHoursSpan: document.querySelector('span[data-hours]'),
  timerMinutesSpan: document.querySelector('span[data-minutes]'),
  timerSecondsSpan: document.querySelector('span[data-seconds]'),
};
StartBtnBlock();
// *

let selectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // ? // Якщо дата в минулому- роблю alert та виходжу з функції
  // ? Якщо дата валідна- кнопка start стає активна ;
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure('Please choose a date in the future!');
      StartBtnBlock();
      return;
    }
    counterStartBtnUrl.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};
// ? // Вішаю flatpickr на інпут
flatpickr(dataTimePickerUrl, options);

// ? // Додаю слухач кліку, та функцію, яка перевіряє чи активний інтервал, після чого створює його.
// ? Потім створює змінну, в якій рахує різницю часу в мс, яку потім обробляє функція convertMs.
// ? Після обробки переведення в строку та перевірки addLeadingZero додає готове значення в текст спанів.
counterStartBtnUrl.addEventListener('click', onCounterStart);
let isIntervalActive = false;
function onCounterStart() {
  if (isIntervalActive) {
    Notify.warning(
      'The countdown has already started! Please, reload the page.'
    );
    return;
  }
  Notify.success('The countdown has begun.');
  const intervalId = setInterval(() => {
    let preventTimerResult = selectedDate - new Date().getTime();
    let convertedTimerResult = convertMs(preventTimerResult);

    urls.timerDaysSpan.textContent = addLeadingZero(
      String(convertedTimerResult.days)
    );
    urls.timerHoursSpan.textContent = addLeadingZero(
      String(convertedTimerResult.hours)
    );
    urls.timerMinutesSpan.textContent = addLeadingZero(
      String(convertedTimerResult.minutes)
    );
    urls.timerSecondsSpan.textContent = addLeadingZero(
      String(convertedTimerResult.seconds)
    );

    if (preventTimerResult < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
  isIntervalActive = true;
}

// ? // Функція додавання нулю на початку
function addLeadingZero(value) {
  return value.padStart(2, 0);
}
// ? Додає атрибут disabled
function StartBtnBlock() {
  counterStartBtnUrl.setAttribute('disabled', 'true');
}
// * // Функція що рахує різницю (із тз)
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
