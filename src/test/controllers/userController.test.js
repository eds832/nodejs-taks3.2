import { saveUser, getUser, updateUser, getUsers, removeUser, checkUser, loginUser } from '../../controllers/userController';
import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove, checkToken, login } from '../../services/UserService';
import { notFoundEntity, unauthorized, forbidden, wrongLogin, wrongLoginPassword } from '../../util/constant';
import uuid from 'uuid';
import bcrypt from 'bcryptjs';

jest.mock('../../services/UserService', () => ({
    save: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    getAutoSuggestUsers: jest.fn(),
    getAllUsers: jest.fn(),
    remove: jest.fn(),
    checkToken: jest.fn(),
    login: jest.fn()
}));

jest.mock('uuid', () => ({ v4: jest.fn() }));

const user1WithoutPass = { id: 'id1', login: 'login1', age: 11, isDeleted: false };
const user2WithoutPass = { id: 'id2', login: 'login2', age: 12, isDeleted: false };
const user1WithEncryptedPass = { id: 'id1', login: 'login1', password: 'aa11', age: 11, isDeleted: false };
const user2WithEncryptedPass = { id: 'id2', login: 'login2', password: 'b22b', age: 12, isDeleted: false };

describe("Check method \'saveUser\' ", () => {
    let req;
    let res;
    let mockedNext;
    let id;
    let v4Spy;
    let encryptedPass;
    let bcryptSpy;

    beforeEach(() => {
        req = { body: { login: 'login1', password: 'password1', age: 11 } };
        res = { locals: {} };
        mockedNext = jest.fn();
        id = 'id1';
        v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(id);
        encryptedPass = 'aa11';
        bcryptSpy = jest.spyOn(bcrypt, 'hash').mockReturnValue(encryptedPass);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        save.mockReturnValueOnce(user1WithEncryptedPass);

        await saveUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(201);
        expect(res.locals.send).toEqual(user1WithoutPass);
        expect(save).toBeCalledWith(user1WithEncryptedPass);
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should have status 400 and call next with correct value', async () => {
        save.mockReturnValueOnce(null);

        await saveUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(400);
        expect(res.locals.send).toEqual(wrongLogin);
        expect(save).toBeCalledWith(user1WithEncryptedPass);
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if save throws error', async () => {
        const mError = new Error('internal err');

        save.mockImplementationOnce(async () => {
            throw mError;
        });

        await saveUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('saveUser failed: {"id":"id1","login":"login1","age":11,"isDeleted":false}, message: internal err');
        expect(save).toBeCalledWith(user1WithEncryptedPass);
        expect(save).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'getUser\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: {}, params: { id: 'id1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        getById.mockReturnValueOnce(user1WithEncryptedPass);

        await getUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(user1WithoutPass);
        expect(getById).toBeCalledWith('id1');
        expect(getById).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        getById.mockReturnValueOnce(null);

        await getUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(404);
        expect(res.locals.send).toEqual(notFoundEntity);
        expect(getById).toBeCalledWith('id1');
        expect(getById).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if getById throws error', async () => {
        const mError = new Error('internal err');

        getById.mockImplementationOnce(async () => {
            throw mError;
        });

        await getUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('getUser by id: id1 failed, message: internal err');
        expect(getById).toBeCalledWith('id1');
        expect(getById).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'updateUser\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: { login: 'login1', password: 'password1', age: 11, isDeleted: false }, params: { id: 'id1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        update.mockReturnValueOnce(user1WithEncryptedPass);

        await updateUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(user1WithoutPass);
        expect(update).toHaveBeenCalledTimes(1);
    });

    test('should have status 400 and call next with correct value', async () => {
        update.mockReturnValueOnce({ error: true });

        await updateUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(400);
        expect(res.locals.send).toEqual(wrongLogin);
        expect(update).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        update.mockReturnValueOnce(null);

        await updateUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(404);
        expect(res.locals.send).toEqual(notFoundEntity);
        expect(update).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if update throws error', async () => {
        const mError = new Error('internal err');

        update.mockImplementationOnce(async () => {
            throw mError;
        });

        await updateUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('updateUser failed: {"id":"id1","login":"login1","age":11,"isDeleted":false}, message: internal err');
        expect(update).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'getUsers\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: { loginSubstring: 'og', limit: 2 } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call getAutoSuggestUsers, then call next with correct value', async () => {
        getAutoSuggestUsers.mockReturnValueOnce([user1WithEncryptedPass, user2WithEncryptedPass]);

        await getUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual([user1WithoutPass, user2WithoutPass]);
        expect(getAutoSuggestUsers).toBeCalledWith('og', 2);
        expect(getAutoSuggestUsers).toHaveBeenCalledTimes(1);
    });

    test('should call getAllUsers, then call next with correct value', async () => {
        req = { body: { } };

        getAllUsers.mockReturnValueOnce([user1WithEncryptedPass, user2WithEncryptedPass]);

        await getUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual([user1WithoutPass, user2WithoutPass]);
        expect(getAllUsers).toBeCalledWith();
        expect(getAllUsers).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if getAutoSuggestUsers throws error', async () => {
        const mError = new Error('internal err');

        getAutoSuggestUsers.mockImplementationOnce(async () => {
            throw mError;
        });

        await getUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('getUsers failed, loginSubstring: og, limit: 2, message: internal err');
        expect(getAutoSuggestUsers).toBeCalledWith('og', 2);
        expect(getAutoSuggestUsers).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'removeUser\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: {}, params: { id: 'id1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        remove.mockReturnValueOnce(user1WithEncryptedPass);

        await removeUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(user1WithoutPass);
        expect(remove).toBeCalledWith('id1');
        expect(remove).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        remove.mockReturnValueOnce(null);

        await removeUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(404);
        expect(res.locals.send).toEqual(notFoundEntity);
        expect(remove).toBeCalledWith('id1');
        expect(remove).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if remove throws error', async () => {
        const mError = new Error('internal err');

        remove.mockImplementationOnce(async () => {
            throw mError;
        });

        await removeUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('removeUser by id: id1 failed, message: internal err');
        expect(remove).toBeCalledWith('id1');
        expect(remove).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'checkUser\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { headers: { authorization: 'Bearer ab12' } };
        res = {};
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call checkToken, then call next', async () => {
        checkToken.mockReturnValueOnce(true);

        await checkUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(checkToken).toBeCalledWith('ab12');
        expect(checkToken).toHaveBeenCalledTimes(1);
    });

    test('should have status 401 and send unauthorized', async () => {
        req = { headers: {} };
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);

        await checkUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(0);
        expect(checkToken).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(unauthorized);
    });

    test('should have status 403 and send forbidden', async () => {
        checkToken.mockReturnValueOnce(false);
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);

        await checkUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(forbidden);
        expect(checkToken).toBeCalledWith('ab12');
        expect(checkToken).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if checkToken throws error', async () => {
        const mError = new Error('internal err');

        checkToken.mockImplementationOnce(() => {
            throw mError;
        });

        await checkUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('checkUser with authHeader: Bearer ab12 failed, message: internal err');
        expect(checkToken).toBeCalledWith('ab12');
        expect(checkToken).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'loginUser\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: { username: 'login1', password: 'password1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 201 and call next with correct value', async () => {
        login.mockReturnValueOnce('abc123');

        await loginUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toBeCalledWith(201);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toBeCalledWith({ token: 'abc123' });
        expect(login).toBeCalledWith('login1', 'password1');
        expect(login).toHaveBeenCalledTimes(1);
    });

    test('should have status 401 and wrongLoginPassword', async () => {
        login.mockReturnValueOnce(null);

        await loginUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toBeCalledWith(wrongLoginPassword);
        expect(login).toBeCalledWith('login1', 'password1');
        expect(login).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if login throws error', async () => {
        const mError = new Error('internal err');

        login.mockImplementationOnce(async () => {
            throw mError;
        });

        await loginUser(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('loginUser with login: login1 failed, message: internal err');
        expect(login).toBeCalledWith('login1', 'password1');
        expect(login).toHaveBeenCalledTimes(1);
    });
});
