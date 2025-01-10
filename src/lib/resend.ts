import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, waitlistPosition: number) => {
    return resend.emails.send({
        from: 'Bea Films <noreply@beafilms.com>',
        to: email,
        subject: 'Welcome to Bea Films Waitlist!',
        html: `
            <div>
                <h1>Welcome to Bea Films!</h1>
                <p>You're #${waitlistPosition} on our waitlist.</p>
                <p>We're excited to have you join us on this journey to reimagine cinema.</p>
                <p>Stay tuned for updates and exclusive content!</p>
            </div>
        `
    });
};
