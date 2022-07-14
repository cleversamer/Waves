const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const config = require("../config.json");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: config.verification.email,
    pass: process.env["EMAIL_PRIVATE_KEY"],
  },
});

module.exports.registerEmail = async (email, user) => {
  try {
    const emailToken = user.genRegisterToken();

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Waves",
        link: `${config.verification.emailURL}`,
      },
    });

    const emailBody = mailGenerator.generate({
      body: {
        ...config.email,
        name: email,
        action: {
          ...config.email.action,
          button: {
            ...config.email.action.button,
            link: `${config.verification.siteDomain}?${config.verification.queryParam}=${emailToken}`,
          },
        },
      },
    });

    const message = {
      from: config.verification.email,
      to: email,
      subject: "Welcome to waves!",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};
