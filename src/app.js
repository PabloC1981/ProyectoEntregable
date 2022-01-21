import express from 'express';
import {engine} from 'express-handlebars'; 
import cors from 'cors';      
//import ContenedorProductos from './contenedores/contenedorDeProductos.js';
//import ContenedorCarrito from './contenedores/contenedorCarrito.js';
import carritoRouter from './routes/carrito.js'
import prodRouter from './routes/productos.js'
import usersRouter from './routes/users.js'
import upload from './services/upload.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { authAdmin } from './utils.js';
import { product , chats, users } from './daos/index.js';
import { generate } from './utils.js';
import ios from 'socket.io-express-session';

const app = express();
const PORT = process.env.PORT|| 8080;
const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: 8080")
})



export const io = new Server(server);
app.engine('handlebars',engine())//para definir el motor  la plantilla de HANDELBARS
app.set('views',__dirname+'/views') //Cuando quiera renderizar los productos,a que carpeta accedo?/views
app.set('view engine','handlebars')//cuando se trabaje con un motor/acceder a handlerbas

const admin = true; //Contante buleana que simulará permiso de usuario para la ejecucion de tareas
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    req.auth=admin;
    next();
})

app.use(express.static(__dirname+'/public'));
app.use('/api/productos',prodRouter); 
app.use('/api/users',usersRouter);
app.use('/api/carrito',carritoRouter);
//io.use(ios(baseSession));

//mIDDLEWARE PARA SUBIR Y VALIDAR SI NO SE SUBIO ARCHIVOS el single es para un unico archivo//si quiero acceder a mas archivos . array
app.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió archivo"})
    }
    res.send(files);
})
app.get('/view/productos',authAdmin,(req,res)=>{
    product.getAll().then(result=>{
        let info = result.payload; //recojo informacion para mostrar a la vista
        let preparedObject ={  //se prepara la informacion para mostrar
            productos : info  // productos es el mismo nombre que esta en producto.hbs
        }
        res.render('productos',preparedObject) //mostramos la vista que se armó // segundo argumentos el producto que se armo
    })
})
//////////
//FaKeR///
//////////
app.get('/api/productos-test',(req,res)=>{
    let cant = req.query.cant?parseInt(req.query.cant):10;
    let products= generate(cant)
    res.send({product:products})
})
//////////
//socket//
/////////
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let prods = await product.getAll();
    socket.emit('updateProd',prods);

})

//ChatLaboro
// app.get('/currentUser',(req,res)=>{
//     res.send(req.session.users)
// }) 
let messages = [];


io.on('connection', socket=>{
    console.log('Cliente conectado')
    socket.on('message',data=>{
        console.log(data)
    
    })
});
io.on('connection', socket=>{
    socket.broadcast.emit('thridConnection', 'Alguien se ha conectado al chat')
    socket.emit('messagelog',messages);
    socket.on('message', async data =>{
        const user = await users.get(socket.handshake.session.user.username)
        let message ={
            user:user._id,
            text:data.message
        }
        await messageService.save(message);
        const messages = await chats.getAll();

        messages.push({id:socket.id,message:data});
        chats.register({author:{user:data.user,id:data.id},message:data.message}).then(result=>{
            
         res.send(result)
            console.log(result)
            console.log(data) 
        })
        
        io.emit('messagelog',messages);
    })
    
})
/////////////
//Normalizr//
/////////////
app.get('/norm',(req, res)=>{
    chats.getNormalizChats().then(result=>{
        res.send(result)
    })
})

app.use(function(req, res){
    res.status(404).send({ 404: "No encontrado" });
});

