import express from 'express';
import ContenedorProductos from '../contenedores/contenedorDeProductos.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
import { product } from '../daos/index.js';


const router = express.Router();
const contenedor = new ContenedorProductos()

router.get('/', (req,res)=>{
    product.getAll().then(result=>{   
    res.send(result);
    })
})
router.get('/:pid', (req,res)=>{
    let id = parseInt(req.params.pid)
    product.getById(id).then(result=>{
    res.send(result);
    })
})
router.post('/',upload.single('image'),(req,res)=>{
    let producto = req.body;
    let file = req.file
    console.log(producto)
    //producto.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    product.register(producto).then(result =>{
    res.send(result)
    if(result.status==="success"){
        product.getAll().then(result=>{
            console.log(result);
            io.emit('updateProd',result);
        })
    }
    })
})
router.put('/:pid',(req,res)=>{
    let body = req.body;
    let id= parseInt(req.params.pid)
    product.update(id,body).then(result=>{
    res.send(result)
    })
})
router.delete('/:pid',(req,res)=>{
    let id= parseInt(req.params.pid)
    product.delete(id).then(result=>{
        res.send(result)
    })
})


export default router;