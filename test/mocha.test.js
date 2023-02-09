import supertest from "supertest"
import chai, { expect } from 'chai'

const request = supertest('http://localhost:8080');

describe("Testeo de la funcionalidad del manejo de Productos", function(){
    describe("Testeo del GET Productos", ()=> {
        it("Deberia retornar un status 200", async ()=> {
            let response = await request.get('/productos');
            expect(response.status).to.eql(200);
        });
    });
    
    describe("Testeo del POST Productos", ()=> {
        it("Deberia incorporar un producto", async ()=> {
            let producto = {
                title : "Producto agregado por test con mocha",
                price : "0",
                thumbnail : "MochaTest.jpg"
            }
            let response = await request.post('/productos').send(producto);
            expect(response.status).to.eql(200);
            const productRes = response.body[0];
            expect(productRes).to.include.keys('title', 'price');
        });
    });

    describe("Testeo del PUT Productos", ()=> {
        it("Deberia modificar un producto", async ()=> {
            let producto = {
                title : "Producto modificado por test con mocha",
                price : "1",
                thumbnail : "Mochadificado.jpg"
            }
            //Modificar el ID en response.
            let response = await request.put('/productos/58').send(producto);
            expect(response.status).to.eql(200);
            const productRes = response.body[0];
            expect(productRes).to.include.keys('title', 'price');
        });
    });

    describe("Testeo de DELETE Productos", ()=> {
        it("Deberia borrar un producto", async ()=> {
            //Modificar el ID en response.
            let response = await request.delete('/productos/59');
            expect(response.status).to.eql(200);
        });
    });
});