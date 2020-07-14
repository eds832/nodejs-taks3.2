import { checkUser } from '../controllers/userController';

const authMiddleware = (req, res, next) => {
    if (req.path === '/login' && req.method === 'POST') {
        next();
    } else {
        checkUser(req, res, next);
    }
};

export default authMiddleware;
