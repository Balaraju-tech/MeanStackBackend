const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    format: format.printf((log)=>{
        return `[${log.level.toUpperCase()}] - ${log.message}`;
    }),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logsFile'}),
    ],
});

module.exports = logger;