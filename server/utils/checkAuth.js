import jwt from 'jsonwebtoken'
import errorHandler from './errorHandler.js'

const isAuthentic = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        const err = errorHandler(401, 'Token not provided');
        return next(err);
    }

    jwt.verify(token, process.env.SECRET, (err, decodedData) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const error = errorHandler(401, 'Token has expired');
                return next(error);
            } else {
                const error = errorHandler(401, 'Invalid Token');
                return next(error);
            }
        } else {
            req.user = decodedData;
            return next();
        }
    })
}

const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            return next()
        } 

    } catch (err) {
        console.error('isAdmin Error:', err.message);
        return next(err);
    }
}


export { isAuthentic, isAdmin }