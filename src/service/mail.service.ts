import sgMail from '@sendgrid/mail';

export const MailService = {
    sendConfirmationEmail: async (email: string, confirmationUrl: string): Promise<void> => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        console.log(email);
        const message = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || '',
            subject: 'Confirmation de votre compte',
            html: (`
                <p>Bonjour,</p>
                <p>Pour finaliser votre inscription sur la plateforme jahbaf, merci de cliquer sur le lien ci-dessous :<br>
                <a href="${confirmationUrl}">Confirmer mon compte</a><br>
                Si vous n'êtes pas à l'origine de cette action, ignorez simplement cet e-mail.<br>
                Pour toute demande, contactez nous à cette adresse : contact@jahbaf.io.<br><br>
                Nous vous remercions pour votre confiance.<br><br>
                L'équipe Jahbaf</p><br><br>
            `),
        };
        await sgMail.send(message);
    },
    createMailingURL: (token: string, route: string): string => {
        return `${process.env.FRONTEND_URL}${route}?token=${token}`;
    }
}

