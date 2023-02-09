import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url';
import path from 'path';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValid = (user, password) => bcrypt.compareSync(password, user.password)

export const sessionChecker = (req, res, next) => {
    if (req.session.email && req.cookies.user_sid) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);