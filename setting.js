import 'dotenv/config'


export const TEMPLATES_DIR = 'templates'
export const VIEW_ENGINE = 'ejs'
export const STATIC = 'public'
export const DB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/local-library`
