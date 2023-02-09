import knex from 'knex'

export default class ProductsManager {
    constructor(options, tableName) {
        const database = knex(options);
        database.schema.hasTable(tableName).then(function(exists) {
            if (!exists) {
                console.log('tabla creada')
                return database.schema.createTable(tableName, table => {
                table.increments('id')
                table.string('title', 200)
                table.integer('price')
                table.string('thumbnail', 2000)
             });
            }
          });
        this.database = database;
        this.table = tableName;
    }

    createTable = async (options, tableName)=> {
        const database = knex(options);
        await database.schema.hasTable(tableName).then(function(exists) {
            if (!exists) {
                console.log('tabla creada')
                return database.schema.createTable(tableName, table => {
                table.increments('id')
                table.string('title', 200)
                table.integer('price')
                table.string('thumbnail', 2000)
             });
            }
          });
    }

    create = async (producto) => {
        let id = await this.database(this.table).insert(producto);
        return this.findById(id);
    }
    
    findAll = async () =>{
        let producto = JSON.parse(JSON.stringify(await this.database.from(this.table).select('*')))
        return await producto;
    }

    findById = async (id) =>{
        id = parseInt(id);
        let producto = JSON.parse(JSON.stringify(await this.database.from(this.table).select('*').where('id', id)))
        return await producto;
    }

    update = async (id, producto) => {
        id = parseInt(id);
        await this.database(this.table).where('id', id).update(producto);
        return await this.findById(id)
    }

    delete = async (id) => {
        id = parseInt(id);
        return await this.database(this.table).where('id', id).del()
}
}

