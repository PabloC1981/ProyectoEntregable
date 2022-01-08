import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import faker from 'faker';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authAdmin = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message: "ruta:user/NO AUTORIZADO"})
    else next(); 
}
export default __dirname;

// export const generate = () =>{
//     let product=[];
//     for(let i = 1 ; i=5 ; i++ ){
//         product.push({
//             id :faker.id.id(),
//             sku : faker.sku.sku(),
//             title : faker.title.title(),
//             price : faker.price.price(),
//             stock : faker.status.stock(),
//             thumbnail : faker.thumbnail.avatar()
//         })
//     }
//     return product
// }  


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