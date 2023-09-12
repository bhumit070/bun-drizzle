//import './db/index';
import { Elysia } from 'elysia';

export const server = new Elysia();

server.all('*', (context) => {
    context.set.status = 404;
    context.body = {
        message: 'Route Not Found',
    };
    return context.body;
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
