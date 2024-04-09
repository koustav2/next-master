import { z } from "zod";
import { verifyCodeSchema } from "./signup.schema";

const verifySchema = z.object({
    verifyCode: verifyCodeSchema

})

export default verifySchema