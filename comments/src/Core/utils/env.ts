import { str, cleanEnv } from 'envalid';
import { config } from 'dotenv';
config();


export const ENV_SPEC = {
    MONGO_URI: str(),
    PORT: str(),
    ACCESS_TOKEN_SECRET: str(),
    ACCESS_TOKEN_EXPIRY: str(),
    EXCHANGE_NAME: str(),
    MESSAGE_BROKER_URL: str(),
    COMMENTS_QUEUE:str(),
    COMMENTS_BINDING_KEY:str(),
    POSTS_BINDING_KEY:str(),
}

const env = cleanEnv(process.env, ENV_SPEC);
export default env;
