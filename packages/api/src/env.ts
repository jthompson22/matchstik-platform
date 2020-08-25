export const DEBUG_ENABLED = true;
export const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'localhost';
export const MONGO_DB_PORT = process.env.MONGO_DB_PORT || '27017';
export const JWT_SECRET = process.env.JWT_SECRET || 'THIS_IS_NOT_SECURE!#$%';
export const WEB_UI_URL = process.env.WEB_UI_URL || 'http://localhost:3000';
export const GCP_BUCKET_NAME = process.env.GCP_BUCKET_NAME;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
