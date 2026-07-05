import express from "express";
import { getMe, Login, logout, signup } from "../controller/auth.controller.js";
import { signUpSchema } from "../validator/auth.validator.js";

const router = express.Router();

/**
 * Generic Zod validation middleware.
 * Usage: validate({ body: someSchema })
 */
function validate({ body: schema }) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues,
            });
        }
        req.validatedBody = result.data;
        next();
    };
}

router.post("/signup", validate({ body: signUpSchema }), signup);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/me", getMe);

export default router;