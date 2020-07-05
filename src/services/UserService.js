import { saveUser, getUser, getAutoSuggest, getAll, updateUser, removeUser, getUserByLogin } from '../data-access/UserRepository';
import jwt from 'jsonwebtoken';
import logger from '../util/logger';
import bcrypt from 'bcryptjs';

export const save = async (newUser) => {
    return await saveUser(newUser);
};

export const getById = async (id) => {
    return await getUser(id);
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    return await getAutoSuggest(loginSubstring, limit);
};

export const getAllUsers = async () => {
    return await getAll();
};

export const update = async (id, user) => {
    return await updateUser(id, user);
};

export const remove = async (id) => {
    return await removeUser(id);
};

export const checkToken = async (token) => {
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.APP_SECRET);
    } catch (err) {
        logger.warn(`token: ${token} has error: ${err}`);
        return false;
    }
    const user = decoded && decoded.sub && await getUser(decoded.sub);
    if (user) {
        logger.info(`user with id: ${user.id} is authorized with token: ${JSON.stringify(decoded)}`);
        return true;
    }
    logger.warn(`user with decoded token: ${decoded} wasn't found`);
    return false;
};

export const login = async (username, password) => {
    const user = await getUserByLogin(username);
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            return jwt.sign({ sub: user.id }, process.env.APP_SECRET, { expiresIn: process.env.APP_SECRET_VALID });
        }
    }
    return null;
};
