import express from 'express';
import ContenedorCarrito from '../classes/contenedorCarrito.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
const router = express.Router();
const contenedor = new ContenedorCarrito();

router.get('/', (req,res)=>{
    contenedor.getAllProductosCarrito().then(result=>{   
    res.send(result);
    })
})

router.post('/',upload.single('image'),(req,res)=>{
    let id = req.body;
    console.log(id)
    contenedor.registerCarrito(id).then(result =>{
    res.send(result)
    
    })
})

router.delete('/:id',(req,res)=>{
    let cid= parseInt(req.params.id)
    contenedor.deletecarrito(cid).then(result=>{
        res.send(result)
    })
})
router.post('/:id/productos',upload.single('image'),(req,res)=>{
    let carr = req.body;
    console.log(carr)
    contenedor.updateCarrito(carr).then(result =>{
    res.send(result)
    })
})
export default router;

