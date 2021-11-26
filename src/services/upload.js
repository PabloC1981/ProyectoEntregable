import multer from 'multer';


//MULTER // ALMACENAMIENTO EN EL SERVIDOS
const storage = multer.diskStorage({  
    destination:function(req,file,cb){
        if(file.fieldname ==="image"){
            cb(null,'public/images')
        }else if(file(file.fieldname==="documents")){
            cb(null,'documents')
        }
        else{
            cb(null,'uploads')
        }
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname) //para que se llame EXACTAMENTE como se llama el archivo//Datename para no reescribir el subido
    }
}) 
const upload = multer({storage:storage}) //ES PARA INDICAR DONDE GUARDAR LO QUE SUBA CONFIG. DE ARRIBA

export default upload;