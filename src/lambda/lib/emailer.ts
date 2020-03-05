// import SES from 'aws-sdk/clients/ses';
const SES = require('aws-sdk/clients/ses');
const ses = new SES();

import axios from 'axios';

/**
 * Email function
 */
export const emailer = async (event: any, callback: AWSLambda.Callback) => {
  //
  // Define params
  const body = JSON.parse(event.body);
  const response = {
    isBase64Encoded: false,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: '{"success": true}'
  };
  //
  // Call ses-email api
  return new Promise((resolve, reject) => {
    sendEmail(body, (err, data) => {
      if (!!err) {
        callback(err, { ...response, statusCode: 500, body: '{"result": "Server Error."}' });
        reject();
      }
      callback(null, response);
      resolve();
    });
  });
};
//
async function sendEmail(
  data: {
    name: string;
    email: string;
    message: string;
    recaptchaToken?: string;
  },
  done: (err, data) => void
) {
  // Verify Recaptcha Token if RECAPTCHA_SECRET is provided to env vars
  if (!!process.env.RECAPTCHA_SECRET) {
    const verificationResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify` +
        `?secret=${process.env.RECAPTCHA_SECRET}` +
        `&response=${data.recaptchaToken}`
    );
    if (!verificationResponse.data.success) {
      done(null, data);
      return;
    }
  }

  // Define object with everything SES needs to send email
  const params = {
    Destination: {
      // Note: see here to send to non-verified addresses
      // https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html
      ToAddresses: [process.env.STATIC_RECEIVER_EMAIL]
    },
    Source: process.env.STATIC_SENDER_EMAIL,
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `
          ==========================================
            Dynamic Sender Name: ${data.name}
            Dynamic Sender email: ${data.email}
            Message Submitted: ${new Date().toISOString()}
          ------------------------------------------
            ${data.message}
          ==========================================
          `
        }
      },
      Subject: {
        Data: 'AutoEmail From ' + data.name,
        Charset: 'UTF-8'
      }
    }
  };
  ses.sendEmail(params, done);
}
