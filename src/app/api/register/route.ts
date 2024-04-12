import { connectDB } from '@/lib/dbConnect';
import { userModel } from '@/model/User';
import bcrypt from 'bcryptjs'
export async function POST(req: Request, res: Response) {
    connectDB()
    try {
        const { username, email, password, isVerified } = await req.json();
        if (!username || !password) {
            return Response.json({ error: "Please fill all the fields" }, { status: 400 });
        }
        const user = await userModel.findOne({ email: email });
        if (user) {
            return Response.json({ error: "Email already exists" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: username,
            email: email,
            password: hashedPassword,
            isVerified: isVerified,
            verifyCodeExpiration: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: []
        });
        const savedUser = await newUser.save();
        return Response.json(
            {
                success: false,
                message: "User created successfully",
                data: savedUser
            },
            { status: 200 }
        );
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