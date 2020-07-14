import { checkUser } from '../controllers/userController';

const authMiddleware = (req, res, next) => {
    checkUser(req, res, next);
};

export default authMiddleware;
