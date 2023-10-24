import axios from 'axios';

export const PublishPostEvents = async (payload:any): Promise<void> => {
    axios.post('http://localhost:9003/api/v1/posts/app-events', {payload});
}
