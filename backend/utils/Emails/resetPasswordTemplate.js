const resetPasswordTemplate = (resetUrl) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #111827;">Reset your password</h2>

    <p>Hello,</p>

    <p>
      We received a request to reset your account password.
      Click the button below to set a new password.
    </p>

    <div style="margin: 24px 0;">
      <a 
        href="${resetUrl}"
        style="
          background-color: #2563eb;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-weight: 600;
        "
      >
        Reset Password
      </a>
    </div>

    <p>
      This password reset link will expire in <strong>15 minutes</strong>.
    </p>

    <p>
      If you did not request a password reset, you can safely ignore this email.
      Your password will not be changed.
    </p>

    <hr style="margin: 32px 0;" />

    <p style="font-size: 12px; color: #6b7280;">
      If the button doesn’t work, copy and paste this link into your browser:
      <br />
      <a href="${resetUrl}">${resetUrl}</a>
    </p>
  </div>
`;

module.exports = resetPasswordTemplate;
