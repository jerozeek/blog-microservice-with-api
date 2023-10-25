import amqplib from 'amqplib';
import env from '../utils/env';

export const PostsMessagePublish = async (channel: amqplib.Channel, key:any, message: any) => {
    try {
        channel.publish(env.EXCHANGE_NAME, key, Buffer.from(message));
    }
    catch (error:any) {
        throw new Error(error);
    }
}
