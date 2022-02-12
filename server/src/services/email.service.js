const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `${config.frontendAdminPanel}/auth/reset-password?token=${token}`;
  const text = `Dear user,

  To reset your password, click on this link: ${resetPasswordUrl}

  This link will only be valid for ${config.jwt.resetPasswordExpirationMinutes} minutes.

  If you did not request any password resets, then ignore this email.
  
  Career Development Centre
  IIT(ISM) Dhanbad`;
  const html = `Dear user,<br/><br/>
  To reset your password, click <a href="${resetPasswordUrl}">here</a><br/><br/>
  If the above link doesn't work, copy and paste this URL in your browser:<br/>  
  ${resetPasswordUrl}<br/><br/>  
  This link will only be valid for ${config.jwt.resetPasswordExpirationMinutes} minutes.<br/><br/>
  <i>If you did not request any password resets, then ignore this email.</i><br/><br/>
  Career Development Centre<br/>
  IIT(ISM) Dhanbad<br/>`;

  await sendEmail(to, subject, text, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `${config.frontendAdminPanel}/auth/verify-email?token=${token}`;
  const text = `Dear user,

  To verify your email, click on this link: ${verificationEmailUrl}

  This link will only be valid for ${config.jwt.verifyEmailExpirationMinutes} minutes.

  If you did not create an account, then ignore this email.
  
  Career Development Centre
  IIT(ISM) Dhanbad`;
  const html = `Dear user,<br/><br/>
  To verify your email, click <a href="${verificationEmailUrl}">here</a><br/><br/>
  If the above link doesn't work, copy and paste this URL in your browser:<br/>  
  ${verificationEmailUrl}<br/><br/>  
  This link will only be valid for ${config.jwt.verifyEmailExpirationMinutes} minutes.<br/><br/>  
  <i>If you did not create an account, then ignore this email.</i><br/><br/> 
  Career Development Centre<br/>
  IIT(ISM) Dhanbad<br/>`;

  await sendEmail(to, subject, text, html);
};

/**
 * Send credentials to the newly created user
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendCredentialsEmail = async (to, password) => {
  const subject = 'Account Created for CDC Portal';

  const loginPageUrl = config.frontendAdminPanel;

  const text = `Dear user,

  An account with this email has been created for you. Please login to ${loginPageUrl} with the below credentials:

  Password: ${password}

  After logging in, please verify your email ID and then change this password.

  If you did not create an account, then ignore this email.
  
  Career Development Centre
  IIT(ISM) Dhanbad`;

  const html = `Dear user,<br/><br/>
  An account with this email has been created for you. Please login <a href="${loginPageUrl}">here</a> with the below credentials:<br/><br/>
  <b>Password:</b> ${password}<br/><br/>
  If the above link doesn't work, copy and paste this URL in your browser:<br/>  
  ${loginPageUrl}<br/><br/>  
  <b>After logging in, please verify your email ID and then change this password.</b><br/><br/>
  <i>If you did not create an account, then ignore this email.</i><br/><br/>
  Career Development Centre<br/>
  IIT(ISM) Dhanbad<br/>`;

  await sendEmail(to, subject, text, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendCredentialsEmail,
};
