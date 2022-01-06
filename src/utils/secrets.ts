import dotenv from 'dotenv'

dotenv.config()

export const USER_SESSION_SECRET: string = process.env.USER_SESSION_SECRET
export const USER_VERIFICATION_SECRET: string = process.env.USER_VERIFICATION_SECRET
export const USER_RESET_PASSWORD_SECRET: string = process.env.USER_RESET_PASSWORD_SECRET