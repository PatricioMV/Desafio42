import passport from "passport";
import local from "passport-local"
import { Users } from "../daos/users.js";
import { createHash, isValid } from './utils.js'

const LocalStrategy = local.Strategy

export const initializePassport = () => {

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let user = await Users.findOne({ username: username })
                    if (user) return done(null, false, {message: 'User allready exist'}) 
                    const newUser = {
                        username,
                        password: createHash(password),
                    }
                    try {
                        let result = await Users.create(newUser)
                        return done(null, result)
                    } catch (err) {
                        done(err)
                    }
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await Users.findOne({ username: username })
                    if (!user) return done(null, false)
                    if (!isValid(user, password)) return done(null, false)
                    return done(null, user)
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        let response = Users.findById(id)
        Users.findById(id, done)
    })
}