export const verificationMailTemplate = (userName: string, url: string) => {
	return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="padding: 80px; font-family: 'Inter', sans-serif">
    <p style="margin: 20px 0px">Hi ${userName},</p>
    <p style="margin: 30px 0px">
      Thank you for Joining us! To get started, kindly verify your email address
      via the link below:
    </p>
    <a href="${url}">${url}</a>
    <p style="font-style: italic">
      If the link doesn<span>'</span>t work, copy it into your browser
    </p>
    <p style="margin: 30px 0px">
      Once verified, you'll gain access to post information
    </p>
    <div style="margin-top: 50px">
      <p>Best Regards,</p>
      <p>Waveck Team.</p>
    </div>
  </body>
</html>`;
};

export const passwordResetLink = (userName: string, url: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="padding: 80px; font-family: 'Inter', sans-serif">
    <p style="margin: 20px 0px">Hi ${userName},</p>
    <p style="margin: 30px 0px">
      Your request to reset password has been recieved. Kindly click on the link
      below to reset your password.
    </p>
    <a href="${url}">${url}</a>
    <p style="margin: 30px 0px">
      Please note that this link is valid for 1 hour. If you did not
      initiate this password reset request, please ignore this email, and your
      password will remain unchanged.
    </p>
    <div style="margin-top: 50px">
      <p>Best Regards,</p>
      <p>Waveck Team.</p>
    </div>
  </body>
</html>`;
};
