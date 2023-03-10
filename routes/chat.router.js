import express from 'express'
import chatController from '../controllers/chat.controller.js'

export const chatRouter = express.Router();

chatRouter.get('/', chatController.getAll);

chatRouter.post('/', chatController.createMessage);

chatRouter.delete('/', chatController.deleteMessages);