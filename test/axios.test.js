import axios from 'axios'

async function getProducts() {
    try {
        const response = await axios.get('http://localhost:8080/productos');
        console.log('Productos disponibles: ');
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

async function postProduct() {
    try {
        const response = await axios.post('http://localhost:8080/productos', {
            title : "Producto agregado en testing",
            price : "000",
            thumbnail : "test.jpg"
        });
        console.log('Producto agregado: ');
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

async function putProduct() {
    try {
        const response = await axios.put('http://localhost:8080/productos/48', {
            title : "Producto modificado en testing",
            price : "1",
            thumbnail : "tested.jpg"
        });
        console.log('Producto modificado: ');
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

async function deleteProduct() {
    try {
        const response = await axios.delete('http://localhost:8080/productos/47');
        console.log('Productos restantes: ');
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

// Para el put y el delete hay que cambiar el ID en la URL

// getProducts();
//postProduct();
// putProduct();
// deleteProduct();