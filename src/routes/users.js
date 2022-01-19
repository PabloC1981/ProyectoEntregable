import express from 'express';
import { users, persistence } from '../daos/index.js';

const router = express.Router();
// router.use((req,res,next)=>{
//     let timestamp = Date.now();
//     let time = new Date(timestamp);
//     console.log('Petición hecha a las: '+time.toTimeString().split(" ")[0])
//     next()
// })
router.post('/users',(req,res)=>{
    let user = req.body;
    users.register(user).then(result =>{
        res.send(result)
    })
})    
router.get('/',(req,res)=>{
    users.getAll().then(result =>{
        res.send(result)
    })
})
router.get('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    users.getById(id).then(result=>{
        res.send(result);
    })
})            
router.put('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid)
    let body = req.body;
    users.update(id,body).then(result=>{
    res.send(result)
    })
})  
router.post('/',(req,res)=>{
    let user = req.body;
    users.register(user).then(result =>{
        res.send(result)
    })
})
router.delete('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid)
    users.delete(id).then(result=>{
        res.send(result)
    })
})
// router.post('/login',(req,res)=>{
    
// })


export default router;