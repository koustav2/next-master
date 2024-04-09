import { z } from "zod";
import { emailSchema, passwordSchema } from "./signup.schema";

const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,

})

export default signInSchema