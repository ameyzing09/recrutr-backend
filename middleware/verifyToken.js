import { verify } from 'jsonwebtoken';

import useLogger from '../lib/logger.js'

const logger = useLogger('verifyToken.js');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    logger.info(`Token : ${token}`);
    verify(
        token,
        process.env.JWT_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

export default verifyToken