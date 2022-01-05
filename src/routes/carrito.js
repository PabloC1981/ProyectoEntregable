import express from 'express';
import ContenedorCarrito from '../contenedores/contenedorCarrito.js';
import upload from '../services/upload.js';
import { carrito , persistence } from '../daos/index.js';

const router = express.Router();
const contenedor = new ContenedorCarrito();

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/productos', (req,res)=>{
    let id
    console.log(id)
    if (persistence === "fileSystem"){
        id= parseInt(req.params.id)
    }else{
        id= req.params.id
    }
        carrito.getById(id).then(result=>{   
    res.send(result);
        
    })
})
//POST: '/' - Crea un carrito y devuelve su id.
router.post('/',(req,res)=>{
    carrito.registerCarrito().then(result =>{
    res.send(result)
    
    })
})
//POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/:id/productos',(req,res)=>{
    let id
    if(persistence === "fileSystem"){
        id = parseInt(req.params.id)
    }else{
        id = req.params.id
    }
    //console.log("viene algo", req.body)
    carrito.agregarProductoAlCarrito(id,req.body).then(result =>{
    res.send(result)
    })
})
//DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/:id',(req,res)=>{
    let id
    if(persistence === "fileSystem"){ 
        id= parseInt(req.params.id);
    }else{
        id= req.params.id;
    }
    carrito.delete(id).then(result=>{
        res.send(result)
    })
})
/*DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de 
producto*/
router.delete('/:id/productos/:id_prod',(req,res)=>{
    let idcars
    let idprod
    if(persistence==="fileSystem"){
        idcars = parseInt(req.params.id);
        idprod = parseInt(req.params.id_prod)
    }else{
        idcars = req.params.id;
        idprod = req.params.id_prod
    }
    carrito.deleteProductodeCarrito(idcars,idprod).then(result=>{
        res.send(result)
    
    })
})

export default router;

