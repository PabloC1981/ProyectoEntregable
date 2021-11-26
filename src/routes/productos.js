import express from 'express';
import ContenedorProductos from '../classes/contenedorDeProductos.js';
import upload from '../services/upload.js';
const router = express.Router();
const contenedor = new ContenedorProductos()

router.get('/', (req,res)=>{
    contenedor.getAllProductos().then(result=>{   
    res.send(result);
    })
})
router.get('/:pid', (req,res)=>{
    let id = parseInt(req.params.pid)
    contenedor.getProductById(id).then(result=>{
    res.send(result);
    })
})
router.get('/randomProductos', (req,res) => {
    contenedor.getAllRandomProductos().then(result=>{
        res.send(result);
    })
})
router.post('/',upload.single('image'),(req,res)=>{
    
    let producto = req.body;
    let file = req.file
    //producto.price = parseInt(producto.price)//para convertir en number y que no quede en string el valor
    //producto.stock = parseInt(producto.stock)//para convertir en number y que no quede en string el valor
    console.log(producto)
    producto.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    contenedor.registerProductos(producto).then(result =>{
    res.send(result)
    })
})
router.put('/:pid',(req,res)=>{
    let body = req.body;
    let id= parseInt(req.params.pid)
    contenedor.updateProducto(id,body).then(result=>{
    res.send(result)
    })
})
router.delete('/:pid',(req,res)=>{
    let id= parseInt(req.params.pid)
    contenedor.deleteProducto(id).then(result=>{
        res.send(result)
    })
})


export default router;