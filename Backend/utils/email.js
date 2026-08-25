import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password - Habit Tracker",
    html: `
      <h2>Reset Your Password</h2>

      <p>You requested to reset your Habit Tracker password.</p>

      <p>Click the button below:</p>

      <a href="${resetLink}"
         style="
           display:inline-block;
           padding:12px 20px;
           background:#2563eb;
           color:white;
           text-decoration:none;
           border-radius:6px;
         ">
         Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>

      <p>If you did not request this, you can ignore this email.</p>
    `,
  });
};