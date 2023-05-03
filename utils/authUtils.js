import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const authUtils = {
    generateAuthToken: payload => {
        try {
            const token = jwt.sign(
                payload,
                process.env.JWT_TOKEN_SECRET_KEY,
                { expiresIn: `${process.env.JWT_TOKEN_EXPIRY}h` }
              );
            console.info(`Token created: \n${token}`);
            return token;
        } catch (err) {
            console.error('Error while creating token');
            throw err;
        }
    },
    verifyAuthToken: token => {
        try {
            return jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
        } catch (err) {
            console.error('Error while verifying token : ', err);
            throw err;
        }
    },
    compareAuthCreds: (password, hashedPassword) => {
        try {
            return compare(password, hashedPassword);
        } catch (err) {
            console.error('Error while comparing password : ', err);
            throw err;
        }
    }
};

export default authUtils;