import express from 'express';
const router = express.Router();
import ContenedorProductos from '../classes/contenedorDeProductos.js';
const contenedor = new ContenedorProductos()

router.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Petición hecha a las: '+time.toTimeString().split(" ")[0])
    next()
})    
router.get('/',(req,res)=>{
    contenedor.getAllUsers().then(result =>{
        res.send(result)
    })
})
router.get('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    contenedor.getUserById(id).then(result=>{
        res.send(result);
    })
})            
router.put('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid)
    let body = req.body;
    contenedor.updateUser(id,body).then(result=>{
    res.send(result)
    })
})  
router.post('/',(req,res)=>{
    let user = req.body;
    contenedor.registerUser(user).then(result =>{
        res.send(result)
    })
})
router.delete('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid)
    contenedor.deleteUser(id).then(result=>{
        res.send(result)
    })
})


export default router;