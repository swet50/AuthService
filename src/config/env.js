const requiredVars = [
    "DATABASE_URL",
]

// Validate all required variables exist at AuthService
const missing = requiredVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
    console.error("→ Check your .env file");
    process.exit(1);
}

export const config = {
    PORT: parseInt(process.env.PORT || "5001"),

    //DATABASE
    DATABASE_URL: process.env.DATABASE_URL,

}