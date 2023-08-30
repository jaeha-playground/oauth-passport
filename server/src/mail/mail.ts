import mailer from 'nodemailer';

import welcome from './welcome_template';
import goodbye from './goodbye_template';

const getEmailData = (to: string, name: string, template: string) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: '',
        to,
        subject: `Hello ${name}`,
        html: welcome(),
      };
      break;

    case 'goodbye':
      data = {
        from: '',
        to,
        subject: `Goodbye ${name}`,
        html: goodbye(),
      };
      break;
    default:
      data = {};
  }

  return data;
};

const sendMail = (to: string, name: string, type: string) => {
  const transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: process.env.GOOGLE_EMAIL_PASSWORD,
    },
  });

  const mail = getEmailData(to, name, type);
  transporter.sendMail(mail, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log('email send successfully');
    }

    transporter.close();
  });
};

export default sendMail;
