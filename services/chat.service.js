import PersistenceFactory from "../daos/persistenceFactory.js";

export default class ChatService {
    constructor(){
        this.chatDao
        this.init()
    }

    init = async() => {
        this.chatDao = await PersistenceFactory.getPersistence('chat');
    }

    create = async (message) => {
        return await this.chatDao.create(message);
    }

    findAll = async () => {
        return await this.chatDao.findAll();
    }

    delete = async () => {
        return await this.chatDao.delete();
    }
}

