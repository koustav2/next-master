import { EmailTemplate } from '@/components/auth/Email-template';
import { resend } from '@/lib/resend';
import { NextApiRequest, NextApiResponse } from 'next';



export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log('POST')
    return Response.json({ message:"working" }, { status: 200 });

}
