import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_API_KEY:process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET:process.env.CLOUD_API_SECRET,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    CLIENT_URL:process.env.CLIENT_URL,
    EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS

}