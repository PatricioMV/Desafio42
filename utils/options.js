import { __dirname } from "./utils.js"
import path from 'path';

let sqlLitePath = path.join(__dirname, '../daos/chat.sqlite')

export const optionsSQLite = {
    client: 'sqlite3',
    connection: {
        filename: sqlLitePath
    },
    useNullAsDefault: true
}

export const options = {
    client : 'mysql',
    connection: {
        gost: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'desafiocoder'
    }
}