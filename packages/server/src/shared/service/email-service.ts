import { transporter } from './email-config';

async function sendEmailAfterProcessPayment(email: string, code: string) {
    const mailOptions = {
        from: 'nhs-log@hotmail.com',
        to: email,
        subject: 'Seu processo foi criado com sucesso!',
        text: `Para acompanhar o rastreamento da remessa, utilizar o código ${code} referente ao seu processo.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Erro ao enviar o e-mail de notificação: ' + error);
    }
}

export { sendEmailAfterProcessPayment };
