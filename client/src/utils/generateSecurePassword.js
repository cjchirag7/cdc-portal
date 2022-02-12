function generateSecurePassword() {
  const length = 10;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#+-';
  const digits = '0123456789';
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    if (i === length / 2) {
      retVal += digits.charAt(Math.floor(Math.random() * digits.length));
    } else if (i === length / 2 - 1) {
      retVal += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    } else {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
  }
  return retVal;
}
export default generateSecurePassword;
