import throttle from 'lodash/throttle'; 

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const updateLocalStorage = throttle(() => {
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackData));
}, 500);

const loadFromLocalStorage = () => {
  const feedbackData = localStorage.getItem('feedback-form-state');
  if (feedbackData) {
    const { email, message } = JSON.parse(feedbackData);
    emailInput.value = email;
    messageTextarea.value = message;
  }
};

loadFromLocalStorage();

emailInput.addEventListener('input', updateLocalStorage);
messageTextarea.addEventListener('input', updateLocalStorage);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(feedbackData);
  localStorage.removeItem('feedback-form-state');
});

