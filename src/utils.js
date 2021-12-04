import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authAdmin = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message: "ruta:user/NO AUTORIZADO"})
    else next(); 
}
export default __dirname;


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