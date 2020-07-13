export const omitPassword = (user) => {
    return { id: user.id, login: user.login, age: user.age, isDeleted: user.isDeleted };
};

export const stringifyBody = (body) => {
    const res = Object.assign({}, body);
    if (res.password) {
        delete res.password;
        res.password = 'present';
    }
    return JSON.stringify(res);
};
