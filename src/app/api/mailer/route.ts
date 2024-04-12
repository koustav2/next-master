import { EmailTemplate } from '@/components/auth/Email-template';
import { resend } from '@/lib/resend';
import { NextApiRequest, NextApiResponse } from 'next';



export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, verificationCode, email } = req.body;
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
