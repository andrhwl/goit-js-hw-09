// *
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// ? // Посилання ;
const inputFormUrl = document.querySelector('.form');
const urls = {
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

// ? // Додаю слухач, та функцію onFormSubmit;
inputFormUrl.addEventListener('submit', onFormSubmit);

// ? //
function onFormSubmit(event) {
  event.preventDefault();

  let DelayValue = Number(urls.firstDelay.value);
  let delayStep = Number(urls.delayStep.value);
  let amount = Number(urls.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, DelayValue);
    DelayValue += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
  promise
    .then(() => {
      `${Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)}`;
    })
    .catch(() => {
      `${Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)}`;
    });
}
