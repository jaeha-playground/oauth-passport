import mailer from 'nodemailer';

import welcome from './welcome_template';
import goodbye from './goodbye_template';

const getEmailData = (to: string, name: string, template: string) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: '보내는 사람 이름 <userId@gmail.com>',
        to,
        subject: `Hello ${name}`,
        html: welcome(),
      };
      break;

    case 'goodbye':
      data = {
        from: '보내는 사람 이름 <userId@gmail.com>',
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
      pass: '',
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
