import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt, { compare } from "bcryptjs";
import { User, userModel } from '../model/User';
import { connectDB } from "./dbConnect";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_IDxx as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
                name: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                }
            },
            async authorize(credentials) {
                await connectDB()
                try {
                    if (!(credentials?.email || credentials?.name) || !credentials.password) {
                        return null;
                    }
                    const user = await userModel.findOne<User & { id: string }>({
                        $or: [
                            { email: credentials.email },
                            { name: credentials.name }
                        ]
                    }).select("-messages -verifyCode");
                    if (!user) {
                        throw new Error(" user not found");
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your email")

                    }
                    const isMatch = await compare(credentials.password, user.password);
                    if (!isMatch) {
                        throw new Error("Incorrect username or password");
                    }
                    return user;
                } catch (error: any) {
                    throw new Error(error)

                }
            },
        })
    ],
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl
        },
        async session({ session, token }) {
            const dbuser = await userModel.findOne({
                email: session.user?.email as string
            }).select("-messages -verifyCode")
            return {
                ...session,
                user: {
                    ...dbuser,
                    id: token._id,
                },
            };
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
            }
            return token;
        },

    }
}