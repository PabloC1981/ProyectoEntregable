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
/////////
//Faker//
/////////
export const generate = (n) =>{
    let product=[];
    for(let i = 0 ; i<n ; i++ ){
        product.push({
            id : i+1,
            title : faker.commerce.product(),
            price : faker.commerce.price(),
            thumbnail : faker.image.image()
        })
    }
    return product
}  


/*function ConfigId(length){
    var result = '';
    var characters = 'ASDFADSFDASFADFADSFfadsfadfadsfad465432132456';
    var charactersLength = characters.length;
    for( var i = 0; i< length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    
}

module.exports = ConfigId;*/