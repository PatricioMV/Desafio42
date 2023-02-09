import ChatService from '../services/chat.service.js';
import ChatDTO from '../dtos/chat.dto.js';

let chatService = new ChatService();

const getAll = async (req, res) => {
    let result = await chatService.findAll();
    let resultDTO = result.map(chat => new ChatDTO(chat));
    res.status(200).send(resultDTO);
}
    
const createMessage = async (req, res) => {
    if (!req.body.email || !req.body.message) return res.status(500).send({error: 'data is required'});
    let result = [ await chatService.create(req.body)];
    let resultDTO = result.map(chat => new ChatDTO(chat));
    res.status(200).send(resultDTO);
}

const deleteMessages = async (req, res) => {
    await chatService.delete();
    return res.status(200).send({message: 'chat borrado'})
}

export default { getAll, createMessage, deleteMessages, chatService }
