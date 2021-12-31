import dotenv from 'dotenv'

dotenv.config()

const SECRET: string = process.env.SECRET

export { SECRET }