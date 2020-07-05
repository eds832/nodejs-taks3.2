export const omitPassword = (user) => {
    return { id: user.id, login: user.login, age: user.age, isDeleted: user.isDeleted };
};

export const unless = (path, middleware) => {
    return (req, res, next) => {
        if (path === req.path) {
            return next();
        }
        return middleware(req, res, next);
    };
};

export const stringifyBody = (body) => {
    const res = Object.assign({}, body);
    if (res.password) {
        delete res.password;
        res.password = 'present';
    }
    return JSON.stringify(res);
};
