import express from 'express';
import {engine} from 'express-handlebars'; 
import cors from 'cors';      
import ContenedorProductos from './classes/contenedorDeProductos.js';
import prodRouter from './routes/productos.js'
import usersRouter from './routes/users.js'
import upload from './services/upload.js';


const app = express();
const PORT = process.env.PORT||8080
const contenedor = new ContenedorProductos();
const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: 8080")
})

app.engine('handlebars',engine())//para definir el motor  la plantilla de HANDELBARS
app.set('views','./views') //Cuando quiera renderizar los productos,a que carpeta accedo?/views
app.set('view engine','handlebars')//cuando se trabaje con un motor/acceder a handlerbas

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('public'))
app.use('/api/productos',prodRouter); 
app.use('/api/users',usersRouter);

app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})
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
app.get('/view/productos',(req,res)=>{
    contenedor.getAllProductos().then(result=>{
        let info = result.payload; //recojo informacion para mostrar a la vista
        let preparedObject ={  //se prepara la informacion para mostrar
            productos : info  // productos es el mismo nombre que esta en producto.hbs
        }
        res.render('productos',preparedObject) //mostramos la vista que se armó // segundo argumentos el producto que se armo
    })
})

