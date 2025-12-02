import nodemailer from "nodemailer";

export const verifyEmail = (verificationLink, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    "
  >
    <table
      align="center"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        max-width: 600px;
        background: #ffffff;
        margin: 40px auto;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      "
    >
      <tr>
        <td style="padding: 40px 30px; text-align: center;">
          <h1
            style="
              color: #2563eb;
              font-size: 28px;
              margin-bottom: 10px;
              font-weight: 700;
            "
          >
            Verify Your Email
          </h1>

          <p
            style="
              font-size: 15px;
              color: #4b5563;
              margin-bottom: 25px;
              line-height: 1.6;
            "
          >
            Click the button below to verify your email address and complete your
            registration. This link is valid for <strong>5 minutes</strong>.
          </p>

          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              padding: 14px 30px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              letter-spacing: 0.3px;
              transition: background 0.3s ease;
            "
          >
            Verify Email
          </a>

          <p
            style="
              font-size: 13px;
              color: #6b7280;
              margin-top: 25px;
              line-height: 1.6;
            "
          >
            If the button doesn’t work, copy and paste the link below into your
            browser:
          </p>

          <p
            style="
              font-size: 13px;
              color: #2563eb;
              word-break: break-all;
              background: #f3f4f6;
              padding: 10px;
              border-radius: 6px;
              display: inline-block;
              max-width: 90%;
              text-align: left;
            "
          >
            ${verificationLink}
          </p>

          <p
            style="
              font-size: 13px;
              color: #9ca3af;
              margin-top: 25px;
            "
          >
            Didn’t request this? You can safely ignore this email.
          </p>
        </td>
      </tr>

      <tr>
        <td
          style="
            text-align: center;
            padding: 20px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            border-radius: 0 0 10px 10px;
            color: #9ca3af;
            font-size: 13px;
          "
        >
          © 2025 Printerly. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>

  `;

  const mailConfiguration = {
    from: `"Printerly" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: htmlContent,
  };

  transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) throw Error(error);
    console.log(`OTP email sent to ${email}`);
  });
};
