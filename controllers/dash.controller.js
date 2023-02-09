import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DashController {
    
    getInfo = (req, res) => {
        res.render('info', { argumentoDeEntrada : process.argv.slice(2), plataforma: process.platform, versionNode: process.version, memoria: process.memoryUsage().rss, path: process.execPath, processId: process.pid, capetaDelProyecto: process.cwd() })
    }

    renderLogin = (req, res) => {
        let loginPath = path.join(__dirname, '../public/login.html');
        res.status(200).sendFile(loginPath);
    }

    postLogin = (req, res) => {
        req.session.username = req.body.username;
        res.redirect('/dashboard');
    }

    renderRegister = (req, res) => {
        let registerPath = path.join(__dirname, '../public/register.html');
        res.status(200).sendFile(registerPath);
    }

    postRegister = (req, res) => {
        res.redirect('/login');
    }

    failureRegister = (req, res) => {    
        res.send({err: 'failureRegister'});
    }

    getDashboard = (req, res) => {
        if (req.session.username && req.cookies.user_sid) {
            res.render('productos', { usuario : req.session.username });
        } else {
            res.redirect('/login');
        }
    }

    logOut = (req, res) => {
        if (req.session.username && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.render('logOut', { usuario : req.session.username });
        } else {
            res.redirect('/login');
        }
    }
}

export let dashController = new DashController();