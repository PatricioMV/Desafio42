import express from 'express';
import session from 'express-session';
import compression from 'compression'
import path from 'path';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport'
import { fileURLToPath } from 'url';
import { sessionChecker } from './utils/utils.js';
import { initializePassport } from './utils/passport.config.js'
import { infoLogs, warnLogs, errorLogs } from './utils/logger.js';
import { chatRouter } from './routes/chat.router.js';
import { productosRouter } from './routes/productos.router.js';
import { dashRouter } from './routes/dash.router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.json());
app.use('/public', express.static(__dirname + '/public' ));
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(compression({
	level: 6
}))

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'
})


app.use(session({
    store: MongoStore.create({ 
        client: mongoose.connection.getClient(),
        dbName: 'ecommerce',
        collectionName: 'sessions'
    }),
    key: 'user_sid',
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
    ttl: 3600
}))

initializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
});

app.use('/productos', productosRouter);
app.use('/chat', chatRouter);
app.use('/', infoLogs, dashRouter);