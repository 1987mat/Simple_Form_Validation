const form = document.querySelector('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password_conf');
const email = document.getElementById('mail');
const zipCode = document.getElementById('zip_code');

username.addEventListener('blur', () => {
  if (username.validity.tooShort) {
    showError(username, 'Username is too short.');
  } else {
    setSuccess(username);
  }
});

email.addEventListener('blur', () => {
  let emailValue = email.value.trim();
  if (!isValidEmail(emailValue)) {
    showError(email, 'Email is not valid.');
  } else {
    setSuccess(email);
  }
});

zipCode.addEventListener('blur', () => {
  if (zipCode.validity.patternMismatch) {
    showError(zipCode, 'Zipcode must be 5 digits.');
  } else {
    setSuccess(zipCode);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs();
  console.log(form.childNodes);
});

function validateInputs() {
  let usernameValue = username.value.trim();
  // let passwordValue = password.value.trim();
  // let passwordConfirmValue = passwordConfirm.value.trim();
  let emailValue = email.value.trim();
  let zipCodeValue = zipCode.value.trim();

  if (usernameValue === '') {
    showError(username, 'Username is required.');
  } else if (username.validity.tooShort) {
    showError(username, 'Username is too short.');
  } else {
    setSuccess(username);
    username.classList.add('success');
  }

  // if (passwordValue === '') {
  //   showError(password, 'Password is required');
  // } else if (password.)

  // if (passwordConfirmValue === '') {
  //   showError(passwordConfirm, 'Password is required');
  // }

  if (emailValue === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    showError(email, 'Email is not valid');
  } else {
    setSuccess(email);
    email.classList.add('success');
  }

  if (zipCodeValue === '') {
    showError(zipCode, 'Zip Code is required');
  } else if (zipCode.validity.patternMismatch) {
    showError(zipCode, 'Zip Code must be 5 digits.');
  } else {
    setSuccess(zipCode);
    zipCode.classList.add('success');
  }
}

function showError(element, message) {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector('small');
  errorMsg.innerText = message;
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector('small');
  errorMsg.innerText = '';
}

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
