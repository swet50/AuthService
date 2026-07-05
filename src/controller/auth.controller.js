import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const isProduction = process.env.NODE_ENV === "production";


export const signup = async (req, res) => {

    const COOKIE_OPTIONS = {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    };

    try {
        const { name, email, password, role, adminKey } = req.validatedBody;

        if (role === "admin") {
            if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
                return res.status(403).json({
                    message: "Invalid admin key"
                });
            }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            }
        })

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
        )

        res.cookie("jwt", token, COOKIE_OPTIONS);

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return res.status(201).json({ success: true, user: safeUser, token });


    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        return res.status(500).json({ message: "Internal server error" });

    }

}

export const Login = async (req, res) => {

}

export const logout = async (req, res) => {

}

export const getMe = async (req, res) => {

}

export const forgotPassword = async (req, res) => {

}

export const resetPassword = async (req, res) => {

}


