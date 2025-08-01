import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const secret = process.env.SECRET;
export const film2mediaBaseUrl = process.env.FILM2MEDIA_BASE_URL || '';
export const nodeEnv = process.env.NODE_ENV || 'production';
