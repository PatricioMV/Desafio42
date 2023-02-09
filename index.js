import cluster from 'cluster'
import { cpus } from "os"
import { Server } from 'socket.io';
import { app } from './app.js'
import productService from './controllers/product.controller.js'
import chatService from './controllers/chat.controller.js';

let PORT = parseInt(process.argv.slice(2,3));
if(isNaN(PORT) || undefined) { PORT = 8080 }
let MODO = process.argv.slice(3,4)[0];
if (MODO !== 'CLUSTER' && MODO !== 'FORK') { MODO = 'FORK' }
if(cluster.isPrimary){
    console.log(`Se activo en modo: ${MODO} y puerto: ${PORT}`);
    console.log(`PID de proceso padre:${process.pid}`);
    if(MODO == 'CLUSTER'){
        for(let i = 0; i < cpus().length; i++){
            cluster.fork();
        }
    }
    else {
        cluster.fork();
    }

    cluster.on('exit', () => {
        cluster.fork();
    })
} else {
    const server = app.listen(PORT, () => {
        console.log(`Servidor listo ${process.pid}`)
    })
    
    const io = new Server(server);
    
    io.on('connection', socket => {
        console.log(`Cliente ${socket.id} se conecto`);
        productService.productService.findAll().then(result => io.emit('history', result));
        chatService.chatService.findAll().then(result => socket.emit('chatHistory', result));
        socket.on('productos', data =>{
            productService.productService.findAll().then(result => io.emit('history', result));
        })
        socket.on('chat', data => {
            chatService.chatService.findAll().then(result => io.emit('chatHistory', result));
        })
    })
}