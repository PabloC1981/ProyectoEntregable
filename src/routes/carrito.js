import express from 'express';
import ContenedorCarrito from '../classes/contenedorCarrito.js';
import upload from '../services/upload.js';
const router = express.Router();
const contenedor = new ContenedorCarrito();
//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/productos', (req,res)=>{
    let cid= parseInt(req.params.id)
    contenedor.getAllProductosCarrito(cid).then(result=>{   
    res.send(result);
    })
})
//POST: '/' - Crea un carrito y devuelve su id.
router.post('/',(req,res)=>{
    contenedor.registerCarrito().then(result =>{
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
router.post('/:id/productos',(req,res)=>{
    let cid= parseInt(req.params.id);
    //console.log("viene algo", req.body)
    contenedor.agregarProductoAlCarrito(cid,req.body).then(result =>{
    res.send(result)
    })
})
/*DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de 
producto*/
router.delete('/:id/productos/:id_prod',(req,res)=>{
    let idcarrito= parseInt(req.params.id);
    let idproducto= parseInt(req.params.id_prod)
    contenedor.deleteProductodeCarrito(idcarrito,idproducto).then(result=>{
        res.send(result)
    
    })
})

export default router;

