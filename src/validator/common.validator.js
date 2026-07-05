import { z } from "zod/v4";

// ── Reusable string helpers ──

/**
 * A trimmed, non-empty string with a max length.
 * Strips leading/trailing whitespace and rejects empty strings.
 */
export const safeString = (maxLength = 255) =>
    z.string().trim().min(1, "This field is required").max(maxLength);

/**
 * Optional version of safeString — allows undefined/empty.
 */
export const optionalSafeString = (maxLength = 255) =>
    z.string().trim().max(maxLength).optional();

// ── Email ──

export const emailSchema = z
    .email("Invalid email address")
    .trim()
    .toLowerCase();

// ── Password ──

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters");

// ── Phone (optional, E.164-ish) ──

export const phoneSchema = z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number")
    .optional();

// ── Numbers ──

export const nonNegativeInt = z
    .number()
    .int("Must be an integer")
    .nonnegative("Must be zero or positive");
