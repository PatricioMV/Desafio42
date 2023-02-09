import express from 'express';
import passport from 'passport'
import { dashController } from '../controllers/dash.controller.js';
import { sessionChecker } from '../utils/utils.js';
import { infoLogs, warnLogs, errorLogs } from '../utils/logger.js';

export const dashRouter = express.Router();

dashRouter.get('/info', dashController.getInfo);

dashRouter.get('/login', sessionChecker, dashController.renderLogin);

dashRouter.post('/login', passport.authenticate('login', { failureRedirect : '/failureRegister'}), dashController.postLogin);

dashRouter.get('/register', sessionChecker, dashController.renderRegister);

dashRouter.post('/register', infoLogs , passport.authenticate('register', { failureRedirect : '/failureRegister'}), dashController.postRegister);

dashRouter.get('/failureRegister', dashController.failureRegister);

dashRouter.get('/dashboard', dashController.getDashboard);

dashRouter.get('/logout', dashController.logOut);