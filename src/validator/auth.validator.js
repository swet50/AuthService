import { z } from "zod/v4";
import {
    emailSchema,
    passwordSchema,
    safeString,
    optionalSafeString,
    phoneSchema,
    nonNegativeInt,
} from "./common.validator.js";


export const signUpSchema = z.object({
    name: safeString(100),
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(["user", "provider", "admin"], {
        message: "Role must be user, provider, or admin",
    }).optional(),
    adminKey: z.string().optional(),
})