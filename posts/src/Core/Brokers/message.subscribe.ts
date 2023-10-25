import amqplib from 'amqplib';
import env from '../utils/env';
import {IPostsService} from "../../entity/posts.entity";

export const PostsSubscribeMessage = async (channel: amqplib.Channel, service: IPostsService) => {
    const appQueue = await channel.assertQueue(env.POSTS_QUEUE);
    channel.bindQueue(appQueue.queue, env.EXCHANGE_NAME, env.POSTS_BINDING_KEY);
    channel.consume(appQueue.queue,  data => {
        if (!data) {
            console.log('[PostsSubscribeMessage] No data', data);
            return;
        }
        console.log(`[PostsSubscribeMessage] Message received: ${data?.content.toString()}`);
        service.subscribeEvents(data?.content.toString());
        channel.ack(data);
    });
}
