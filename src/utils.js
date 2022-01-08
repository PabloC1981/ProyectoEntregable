import { fileURLToPath } from 'url';
import { dirname } from 'path';
import faker from 'faker';
const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authAdmin = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message: "ruta:user/NO AUTORIZADO"})
    else next(); 
}
export default __dirname;
///////////////
////FaKer//////
//////////////
export const generate = (n) =>{
    let products=[];
    for (let i=0; i<n; i++){
        products.push({
        id: i+1,
        products:faker.name.findName(),
        price:faker.commerce.price(),
        img:faker.image.image()
        })
    }
    return products;
}
///////////////
////FaKer//////
//////////////
