import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error('SECRET_KEY environment variable is not defined');
}

export const generateToken = (email) => {
    return jwt.sign({ email }, secretKey, { expiresIn: '1d' });
};

export const generateRoleToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        secretKey,
        { expiresIn: '1d' }
    );
};