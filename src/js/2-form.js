const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// 🔹 Завантаження зі сховища при старті
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);

  formData = { ...formData, ...parsedData };

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 🔹 Делегування input-події
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🔹 Обробка сабміту
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = { email: '', message: '' };

  form.reset();
});
