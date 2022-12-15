import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amount.value);
  let delay = Number(refs.firstDelay.value);
  for (let position = 1; position <= amount; position+=1) {
    createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
}
function createPromise(position, delay) {
  const createNewPromise = new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay)
  );
  return createNewPromise;
}
