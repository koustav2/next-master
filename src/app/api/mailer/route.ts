import { EmailTemplate } from '@/components/auth/Email-template';
import { resend } from '@/lib/resend';

export async function POST(req: Request, res: Response) {
    console.log('POST')
    const { firstName, verificationCode, email } = await req.json();
    if (!firstName || !verificationCode || !email) {
        return Response.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
    }
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Email Verification',
            text: 'Email Verification code is sent to the server',
            react: EmailTemplate({ firstName: firstName, verificationCode: verificationCode }),
        });
        return Response.json({ data }, { status: 200 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
