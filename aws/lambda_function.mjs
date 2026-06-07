import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION ?? 'us-east-1' });

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
  const method =
    event.requestContext?.http?.method ?? event.httpMethod ?? 'POST';

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    console.error('Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL env vars');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Server configuration error' }),
    };
  }

  let body;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Invalid JSON input' }),
    };
  }

  const { name, email, phone, serviceType, message } = body;

  const emailParams = {
    Source: fromEmail,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: { Data: `New Sky Sentinel Lead: ${serviceType} - ${name}` },
      Body: {
        Text: {
          Data:
            `From: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Service: ${serviceType}\n` +
            `Project Description: ${message ?? ''}`,
        },
      },
    },
  };

  try {
    await ses.send(new SendEmailCommand(emailParams));
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Flight request sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};
