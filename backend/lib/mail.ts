import { createTransport } from 'nodemailer';

var transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

function createEmailTemplate(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>#CodeNameGrant</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Sick Fits Password Reset',
    html: createEmailTemplate(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
    `)
  })) as MailResponse;
}
