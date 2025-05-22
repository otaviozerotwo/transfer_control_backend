import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(API_KEY);

export async function sendResetPasswordEmail(to: string, token: string) {
  const resetLink = `https://transfer-control-reset-pass-page.vercel.app/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@resend.dev',
    to,
    subject: 'Recuperação de senha',
    html: `
      <p>Você solicitou a redefinicão de sua senha.</p>
      <p><a href="${resetLink}">Clique aqui para redefinir</a></p>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
    `,
  });
}