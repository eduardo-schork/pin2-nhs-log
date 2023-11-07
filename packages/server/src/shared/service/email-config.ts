import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'nhs-log@hotmail.com',
        pass: '123lunur@'
    }
});

export { transporter };
