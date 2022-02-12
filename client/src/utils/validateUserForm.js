import validateEmail from './validateEmail';

const validateUserForm = ({ name, email, password, role }, type) => {
  const errorList = [];
  if (name === '') {
    errorList.push('Name field is required!');
  }
  if (email === '' || validateEmail(email) === false) {
    errorList.push('Please enter a valid Email!');
  }
  if (type !== 'EDIT') {
    if (password.length < 8) {
      errorList.push('Password must be at least 8 characters');
    }
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
      errorList.push('Password must contain at least 1 letter and 1 number');
    }
  }
  if (!role) {
    errorList.push('Role field is required!');
  }

  return errorList;
};

export default validateUserForm;
