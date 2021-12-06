import express from 'express';
import ContenedorCarrito from '../classes/contenedorCarrito.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
const router = express.Router();
const contenedor = new ContenedorCarrito();
//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/', (req,res)=>{
    contenedor.getAllProductosCarrito().then(result=>{   
    res.send(result);
    })
})
//POST: '/' - Crea un carrito y devuelve su id.
router.post('/',upload.single('image'),(req,res)=>{
    let id = req.body;
    console.log(id)
    contenedor.registerCarrito(id).then(result =>{
    res.send(result)
    
    })
})
//DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/:id',(req,res)=>{
    let cid= parseInt(req.params.id);
    contenedor.deletecarrito(cid).then(result=>{
        res.send(result)
    })
})
//POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/:id/productos',upload.single('image'),(req,res)=>{
    let id = parseInt(req.params.id);
    console.log(id)
    contenedor.agregarProductoAlCarrito(id).then(result =>{
    res.send(result)
    })
})
/*DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de 
producto*/
router.delete('/:id/productos/:id_prod',(req,res)=>{
    let id= parseInt(req.params.id);
    contenedor.deletecarritoYproducto(id).then(result=>{
        res.send(result)
    })
})
export default router;

