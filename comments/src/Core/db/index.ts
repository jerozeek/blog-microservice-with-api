import env from '../utils/env';

export const getDBConnectionUrl = (): string => {
    return env.MONGO_URI;
}