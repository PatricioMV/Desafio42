import PersistenceFactory from "../daos/persistenceFactory.js";

export default class ProductService {
    constructor(){
        this.productDao
        this.init()
    }

    init = async() => {
        this.productDao = await PersistenceFactory.getPersistence('products');
    }

    create = async (producto) => {
        return await this.productDao.create(producto);
    }
    
    findAll = async () =>{
        return await this.productDao.findAll();
    }

    findById = async (id) =>{
        return await this.productDao.findById(id);
    }

    update = async (id, producto) => {
        return await this.productDao.update(id, producto);
    }

    delete = async (id) => {
        return await this.productDao.delete(id);
}
}
