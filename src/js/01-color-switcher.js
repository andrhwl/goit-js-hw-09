// ? // Посилання ;
const startButtonUrl = document.querySelector('button[data-start]');
const stopButtonUrl = document.querySelector('button[data-stop]');
const bodyUrl = document.querySelector('body');
// ? // Без об'яви зовнішньої змінної на гіт-хаб сторінці
// ? intervalId буде undefined ;
let intervalId = '';

// ? // Подія і функція, що створює інтервал та додає кнопці атрибут disabled ;
startButtonUrl.addEventListener('click', () => {
  onStartBtnClick();
});
function onStartBtnClick() {
  intervalId = setInterval(() => {
    bodyUrl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButtonUrl.setAttribute('disabled', 'true');
}

// ? // Подія і функція, яка очищує інтервал та видаляє disabled ;
stopButtonUrl.addEventListener('click', onStopBtnClick);
function onStopBtnClick() {
  clearInterval(intervalId);
  startButtonUrl.removeAttribute('disabled');
}

// * // Стилі кнопок
startButtonUrl.classList.add('body__start-btn');
stopButtonUrl.classList.add('body__stop-btn');
// * // Отримання кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
