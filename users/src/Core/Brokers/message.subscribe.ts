import amqplib from 'amqplib';
import env from '../utils/env';
import {IUserService} from "../../entity/user.entity";

export const PostsSubscribeMessage = async (channel: amqplib.Channel, service: IUserService) => {
    const appQueue = await channel.assertQueue(env.USERS_QUEUE);
    channel.bindQueue(appQueue.queue, env.EXCHANGE_NAME, env.USERS_BINDING_KEY);
    channel.consume(appQueue.queue,  data => {
        if (!data) {
            console.log('[USERSSubscribeMessage] No data', data);
            return;
        }
        console.log(`[USERSubscribeMessage] Message received: ${data?.content.toString()}`);
        service.subscribeEvents(data?.content.toString());
        channel.ack(data);
    });
}
