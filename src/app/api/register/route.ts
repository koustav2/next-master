import { connectDB } from '@/lib/dbConnect';
import { userModel } from '@/model/User';
import bcrypt from 'bcryptjs'
export async function POST(req: Request, res: Response) {
    await connectDB()
    try {
        const { username, email, password, isVerified, verifyCode } = await req.json();
        if (!username || !password || !email) {
            return Response.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
        }

        const existingUserUsingUsername = await userModel.findOne({ name: username, isVerified: true });
        if (existingUserUsingUsername) {
            return Response.json({ success: false, message: "Username is already exists" }, { status: 400 });
        }

        const existingUserUsingEmail = await userModel.findOne({ email: email });
        if (existingUserUsingEmail) {
            if (existingUserUsingEmail.isVerified){
                return Response.json({ success: false, message: "Email is already exists" }, { status: 400 });
            }
            else{
                return Response.json({ success: false, message: "Please verify your email" }, { status: 400 })
            }
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const expiryDate = new Date()
            expiryDate.setDate(expiryDate.getDate() + 1)
            const newUser = new userModel({
                name: username,
                email: email,
                password: hashedPassword,
                isVerified: isVerified,
                verifyCode: verifyCode,
                verifyCodeExpiration: expiryDate,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                messages: [],
            });
            const savedUser = await newUser.save();
            return Response.json(
                {
                    success: true,
                    message: "User created successfully",
                    data: savedUser,
                },
                { status: 200 }
            );
        }

    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: "Something went wrong ,getting error while sign-up, please try again"
            },
            { status: 500 }
        )
    }
}