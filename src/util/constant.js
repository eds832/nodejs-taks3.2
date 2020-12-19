export const internalErr = { status: 'Internal Server Error', error: 'Unfortunately, something went a wrong way... Bad luck. Try one more time.' };

export const notFoundEntity = { status: 'Not Found', error: "Entity with specified id wasn't found" };

export const notFound = { status: 'Not Found', error: "Specified resource wasn't found" };

export const statusNotFound = 'Not Found';

export const wrongLogin = { status: 'Bad Request', error: 'Impossible to save user with specified login' };

export const forbidden = { status: 'Forbidden', error: 'Invalid token' };

export const unauthorized = { status: 'Unauthorized', error: "Authorization header wasn't found" };

export const wrongLoginPassword = { status: 'Unauthorized', error: 'Wrong login or password' };
