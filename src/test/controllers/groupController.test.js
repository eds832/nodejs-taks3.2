import { saveGroup, getGroup, updateGroup, getGroups, removeGroup, addUsers } from '../../controllers/groupController';
import { save, getById, update, getAllGroups, remove, addUsersToGroup } from '../../services/GroupService';
import { notFoundEntity } from '../../util/constant';
import uuid from 'uuid';

jest.mock('../../services/GroupService', () => ({
    save: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    getAllGroups: jest.fn(),
    remove: jest.fn(),
    addUsersToGroup: jest.fn()
}));

jest.mock('uuid', () => ({ v4: jest.fn() }));

const user1WithoutPass = { id: 'userId1', login: 'login1', age: 11, isDeleted: false };
const user2WithoutPass = { id: 'userId2', login: 'login2', age: 12, isDeleted: false };
const user1WithEncryptedPass = { id: 'userId1', login: 'login1', password: 'aa11', age: 11, isDeleted: false };
const user2WithEncryptedPass = { id: 'userId2', login: 'login2', password: 'b22b', age: 12, isDeleted: false };
const group1 = { id: 'id1', 'name' : 'a234', 'permissions' : ['READ', 'WRITE', 'SHARE'] };
const group2 = { id: 'id2', 'name' : 'b567', 'permissions' : ['READ', 'SHARE'] };

describe("Check method \'saveGroup\' ", () => {
    let req;
    let res;
    let mockedNext;
    let id;
    let v4Spy;

    beforeEach(() => {
        req = { body: { 'name' : 'a234', 'permissions' : ['READ', 'WRITE', 'SHARE'] } };
        res = { locals: {} };
        mockedNext = jest.fn();
        id = 'id1';
        v4Spy = jest.spyOn(uuid, 'v4').mockReturnValue(id);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        save.mockReturnValueOnce(group1);

        await saveGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(201);
        expect(res.locals.send).toEqual(group1);
        expect(save).toBeCalledWith(group1);
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if save throws error', async () => {
        const mError = new Error('internal err');

        save.mockImplementationOnce(async () => {
            throw mError;
        });

        await saveGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('saveGroup failed: {"id":"id1","name":"a234","permissions":["READ","WRITE","SHARE"]}, message: internal err');
        expect(save).toBeCalledWith(group1);
        expect(save).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'getGroup \' ", () => {
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
        getById.mockReturnValueOnce(group1);

        await getGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(group1);
        expect(getById).toBeCalledWith('id1');
        expect(getById).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        getById.mockReturnValueOnce(null);

        await getGroup(req, res, mockedNext);

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

        await getGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('getGroup by id: id1 failed, message: internal err');
        expect(getById).toBeCalledWith('id1');
        expect(getById).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'updateGroup\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: { 'name' : 'a234', 'permissions' : ['READ', 'WRITE', 'SHARE'] }, params: { id: 'id1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 200 and call next with correct value', async () => {
        update.mockReturnValueOnce(group1);

        await updateGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(group1);
        expect(update).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        update.mockReturnValueOnce(null);

        await updateGroup(req, res, mockedNext);

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

        await updateGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('updateGroup failed: {"id":"id1","name":"a234","permissions":["READ","WRITE","SHARE"]}, message: internal err');
        expect(update).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'getGroups\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = {};
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call getAllGroups, then call next with correct value', async () => {
        getAllGroups.mockReturnValueOnce([group1, group2]);

        await getGroups(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual([group1, group2]);
        expect(getAllGroups).toBeCalledWith();
        expect(getAllGroups).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if getAllGroups throws error', async () => {
        const mError = new Error('internal err');

        getAllGroups.mockImplementationOnce(async () => {
            throw mError;
        });

        await getGroups(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('getGroups failed, message: internal err');
        expect(getAllGroups).toBeCalledWith();
        expect(getAllGroups).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'removeGroup\' ", () => {
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
        remove.mockReturnValueOnce(group1);

        await removeGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(200);
        expect(res.locals.send).toEqual(group1);
        expect(remove).toBeCalledWith('id1');
        expect(remove).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        remove.mockReturnValueOnce(null);

        await removeGroup(req, res, mockedNext);

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

        await removeGroup(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('removeGroup by id: id1 failed, message: internal err');
        expect(remove).toBeCalledWith('id1');
        expect(remove).toHaveBeenCalledTimes(1);
    });
});

describe("Check method \'addUsers\' ", () => {
    let req;
    let res;
    let mockedNext;

    beforeEach(() => {
        req = { body: ['userId1', 'userId2'], params: { id: 'id1' } };
        res = { locals: {} };
        mockedNext = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should have status 201 and call next with correct value', async () => {
        addUsersToGroup.mockReturnValueOnce([user1WithEncryptedPass, user2WithEncryptedPass]);

        await addUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(201);
        expect(res.locals.send).toEqual([user1WithoutPass, user2WithoutPass]);
        expect(addUsersToGroup).toBeCalledWith('id1', ['userId1', 'userId2']);
        expect(addUsersToGroup).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        addUsersToGroup.mockReturnValueOnce(null);

        await addUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(404);
        expect(res.locals.send).toEqual(notFoundEntity);
        expect(addUsersToGroup).toBeCalledWith('id1', ['userId1', 'userId2']);
        expect(addUsersToGroup).toHaveBeenCalledTimes(1);
    });

    test('should have status 404 and call next with correct value', async () => {
        addUsersToGroup.mockReturnValueOnce({ error: "users with ids: [userId1] weren't found" });

        await addUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith();
        expect(res.locals.status).toEqual(404);
        expect(res.locals.send).toEqual({ status: 'Not Found', error: "users with ids: [userId1] weren't found" });
        expect(addUsersToGroup).toBeCalledWith('id1', ['userId1', 'userId2']);
        expect(addUsersToGroup).toHaveBeenCalledTimes(1);
    });

    test('should call next with error if addUsersToGroup throws error', async () => {
        const mError = new Error('internal err');

        addUsersToGroup.mockImplementationOnce(async () => {
            throw mError;
        });

        await addUsers(req, res, mockedNext);

        expect(mockedNext).toHaveBeenCalledTimes(1);
        expect(mockedNext).toHaveBeenCalledWith(mError);
        expect(mError.message).toEqual('addUsers failed, groupId: id1, userIds: ["userId1","userId2"], message: internal err');
        expect(addUsersToGroup).toBeCalledWith('id1', ['userId1', 'userId2']);
        expect(addUsersToGroup).toHaveBeenCalledTimes(1);
    });
});
