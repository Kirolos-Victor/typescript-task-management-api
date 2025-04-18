import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty', // optional, for dev-friendly logs
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        }
    },
    level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug'
});

export default logger;
