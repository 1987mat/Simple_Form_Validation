const form = document.querySelector('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password_conf');
const email = document.getElementById('mail');
const zipCode = document.getElementById('zip_code');
const inputControllerArr = Array.from(
  document.querySelectorAll('.input-controller')
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs();

  if (validateInputs()) {
    Swal.fire('Thanks!');
    clearInputFields();
  }
});

function validateInputs() {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmValue = passwordConfirm.value.trim();
  const emailValue = email.value.trim();
  const zipCodeValue = zipCode.value.trim();

  if (usernameValue === '') {
    showError(username, 'Username is required.');
    return false;
  } else if (username.validity.tooShort) {
    showError(username, 'Username is too short.');
    return false;
  } else {
    setSuccess(username);
    username.classList.add('success');
  }

  if (passwordValue === '') {
    showError(password, 'Password is required');
    return false;
  } else if (password.validity.patternMismatch) {
    showError(password, 'Please enter a valid password');
    return false;
  } else {
    setSuccess(password);
    password.classList.add('success');
  }

  if (passwordConfirmValue === '') {
    showError(passwordConfirm, 'Please confirm your password');
    return false;
  } else if (passwordConfirm.validity.patternMismatch) {
    showError(passwordConfirm, 'Please enter a valid password');
    return false;
  } else if (passwordConfirmValue !== passwordValue) {
    showError(passwordConfirm, 'Password does not match');
    return false;
  } else {
    setSuccess(passwordConfirm);
    passwordConfirm.classList.add('success');
  }

  if (emailValue === '') {
    showError(email, 'Email is required');
    return false;
  } else if (!isValidEmail(emailValue)) {
    showError(email, 'Email is not valid');
    return false;
  } else {
    setSuccess(email);
    email.classList.add('success');
  }

  if (zipCodeValue === '') {
    showError(zipCode, 'Zip Code is required');
    return false;
  } else if (zipCode.validity.patternMismatch) {
    showError(zipCode, 'Zip Code must be 5 digits.');
    return false;
  } else {
    setSuccess(zipCode);
    zipCode.classList.add('success');
  }
  return true;
}

// Get the element's parent element and customize the error message
function showError(element, message) {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector('small');
  errorMsg.innerText = message;
  element.classList.add('error');
}

// Get the element's parent element and customize the success message
function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector('small');
  errorMsg.innerText = '';
  element.classList.remove('error');
  element.classList.add('success');
}

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

// Auto validate single input when user leaves the field
function autoValidate() {
  username.addEventListener('blur', () => {
    if (username.validity.tooShort) {
      showError(username, 'Username is too short.');
    } else {
      setSuccess(username);
    }
  });

  password.addEventListener('blur', () => {
    if (password.validity.patternMismatch) {
      showError(password, 'Please enter a valid password');
    } else {
      setSuccess(password);
    }
  });

  passwordConfirm.addEventListener('blur', () => {
    if (passwordConfirm.validity.patternMismatch) {
      showError(passwordConfirm, 'Password does not match');
    } else {
      setSuccess(passwordConfirm);
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
}

autoValidate();

function clearInputFields() {
  username.value = '';
  username.classList.remove('success');
  password.value = '';
  password.classList.remove('success');
  passwordConfirm.value = '';
  passwordConfirm.classList.remove('success');
  email.value = '';
  email.classList.remove('success');
  zipCode.value = '';
  zipCode.classList.remove('success');
}
