import { z } from 'zod'

const nameSchema = z.string().min(4, {
    message: "username must be atleast 4 characters long"
})
const emailSchema = z.string().email().regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    {
        message: "Please provide a vaild email"
    }
)
const passwordSchema = z.string().min(8).regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    {
        message: "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    }
)
const isVerifiedSchema = z.boolean()
const verifyCodeSchema = z.string()

const signUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    verifyCode: verifyCodeSchema,
})

export default signUpSchema
export {
    nameSchema,
    emailSchema,
    passwordSchema,
    isVerifiedSchema,
    verifyCodeSchema,
}