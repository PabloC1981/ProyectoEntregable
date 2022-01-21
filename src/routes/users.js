import express from 'express';
import { users  } from '../daos/index.js';
import session from 'express-session';
import MongoStore from "connect-mongo";

const router = express.Router();
// router.use((req,res,next)=>{
//     let timestamp = Date.now();
//     let time = new Date(timestamp);
//     console.log('Petición hecha a las: '+time.toTimeString().split(" ")[0])
//     next()
// })
export const baseSession = (session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://pablo:pascual1@lavoro.elux2.mongodb.net/sessions?retryWrites=true&w=majority'}),
    resave:false,
    saveUninitialized:false,
    //useUnifiedTopology: true,
    secret:"loginLavoro",
}))

router.use(baseSession);


router.post('/',(req,res)=>{
    let user = req.body;
    users.register(user).then(result =>{
        res.send(result)
        console.log(result)
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

/////////
//Login//
////////
router.post('/login', (req,res)=>{
    let {email,password} = req.body;
    if(!email||!password) return res.status(400).send({error:"Incomplete fields"})
    const user = users.getBy({email:email});//Obtengo al usuario ya de la DB
    if(!user) return res.status(404).send({error:"User not found"});
    if(user.password!==password) return res.status(400).send({error:"Tu pasword no es el correcto"});
    //Hasta aquí, sabemos que va a haber usuario y que cumple su contraseña.
    req.session.user={
        username:user.username,
        email:user.email
    }
    res.send({status:"Logeado"})
})


export default router;