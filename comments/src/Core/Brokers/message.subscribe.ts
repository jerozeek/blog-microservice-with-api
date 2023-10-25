import amqplib from 'amqplib';
import env from '../utils/env';
import {ICommentService} from "../../entity/comment.entity";

export const CommentsSubscribeMessage = async (channel: amqplib.Channel, service: ICommentService) => {
    const appQueue = await channel.assertQueue(env.COMMENTS_QUEUE);
    await channel.bindQueue(appQueue.queue, env.EXCHANGE_NAME, env.COMMENTS_BINDING_KEY);

    await channel.consume(appQueue.queue, async (data:any) => {
        console.log(`[CommentsSubscribeMessage] Message received: ${data.content.toString()}`);
        channel.ack(data);
    });
}
