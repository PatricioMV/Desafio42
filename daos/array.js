export default class DaoArray {
    constructor(element) {
        this.arrayOf = element
        this.array = [];
    }

    create = async (object) => {
        if (this.array.length === 0) {
            let objFix = {
                id : 1,
                ...object
            }
            this.array.push(objFix);
            return objFix;
        }
        else {
            let objFix = {
                id : this.array[this.array.length-1].id + 1,
                ...object
            } 
            this.array.push(objFix);
            return objFix;
        }
    }

    findAll = async () => {
        return this.array;
    }

    findById = async (id) => {
        return this.array.filter(m => m.id == id)
    }

    update = async (id, update) => {
        let objectDb = await this.findById(id);
        let response = Object.assign(objectDb[0], update);
        this.array.map((o)=>{ if(o.id == id) { 
            o = response;
        }});
        return objectDb[0];
    }

    delete = async (id) => {
        let idInt = parseInt(id)
        let response = this.array.filter(o=> o.id !== idInt);
        this.array = response;
        return this.array;
    }

  
}