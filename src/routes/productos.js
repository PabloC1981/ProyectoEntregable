import express from 'express';
import ContenedorProductos from '../classes/contenedorDeProductos.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
import Products from '../services/Products.js';

const router = express.Router();
const contenedor = new ContenedorProductos();
const productsService = new Products();

router.get('/', (req,res)=>{
     productsService.getProducts().then(result=>{   
    res.send(result);
    })
})
router.get('/:pid', (req,res)=>{
    let id = parseInt(req.params.pid)
    productsService.getProductById(id).then(result=>{
    res.send(result);
    })
})
router.post('/',(req,res)=>{
    let producto = req.body;
    console.log(producto);
    productsService.registerProduct(producto).then(result =>{
    res.send(result)
    
    })
})
router.put('/:id',(req,res)=>{
    let body = req.body;
    let id= parseInt(req.params.id)
    productsService.updateProducto(id,body).then(result=>{
    res.send(result)
    })
})
router.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    productsService.deleteProducto(id).then(result=>{
        res.send(result)
    })
})


export default router;