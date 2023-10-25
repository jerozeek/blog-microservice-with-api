import amqplib from 'amqplib';
import env from '../utils/env';

export const UsersMessageChannel = async () => {
    try {
        const connection = await amqplib.connect(env.MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(env.EXCHANGE_NAME, 'direct', { durable: false });

        return channel;
    }
    catch (error:any) {
        throw new Error(error);
    }
}
