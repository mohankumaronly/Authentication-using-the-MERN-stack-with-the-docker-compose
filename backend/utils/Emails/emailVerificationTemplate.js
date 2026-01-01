const verifyEmailTemplate = (verifyUrl) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #111827;">Verify your email address</h2>

    <p>Hello,</p>

    <p>
      Thank you for creating an account.
      Please verify your email address by clicking the button below.
    </p>

    <div style="margin: 24px 0;">
      <a 
        href="${verifyUrl}"
        style="
          background-color: #16a34a;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-weight: 600;
        "
      >
        Verify Email
      </a>
    </div>

    <p>
      This verification link will expire in <strong>24 hours</strong>.
    </p>

    <p>
      If you did not create this account, you can safely ignore this email.
    </p>

    <hr style="margin: 32px 0;" />

    <p style="font-size: 12px; color: #6b7280;">
      If the button doesn’t work, copy and paste this link into your browser:
      <br />
      <a href="${verifyUrl}">${verifyUrl}</a>
    </p>
  </div>
`;

module.exports = verifyEmailTemplate;
