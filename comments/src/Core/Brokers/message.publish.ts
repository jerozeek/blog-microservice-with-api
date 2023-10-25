import amqplib from 'amqplib';
import env from '../utils/env';

export const CommentsMessagePublish = async (channel: amqplib.Channel, key: string, message: any) => {
    try {
        channel.publish(env.EXCHANGE_NAME, key, Buffer.from(message));
        console.log("[CommentsMessagePublish] Message sent: " + message);
    }
    catch (error:any) {
        throw new Error(error);
    }
}
