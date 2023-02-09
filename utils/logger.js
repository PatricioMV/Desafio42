import log4js from "log4js";

log4js.configure({
    appenders: {
        console: { type: 'console' },
        warnings: { type: 'file', filename: './utils/logs/warnings.log'},
        errors: { type: 'file', filename: './utils/logs/erros.log'},
    },
    categories: {
        default: { appenders: ['console'], level: 'all'},
        console: { appenders: ['console'], level: 'all'},
        warning: { appenders: ['warnings', 'console'], level: 'warn'},
        error: { appenders: ['errors', 'console'], level: 'error'}
    }
})

let consoleLogs = log4js.getLogger('console')

export let infoLogs = (req, res, next) => {
    consoleLogs.info(`Peticion a: ${req.url}, metodo: ${req.method}`)
    next()
}

export let warnLogs = log4js.getLogger('warning')
export let errorLogs = log4js.getLogger('error')