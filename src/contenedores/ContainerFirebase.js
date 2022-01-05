import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();


export default class ContainerFirebase{
    constructor(currentCollection){
     this.currentCollection = db.collection(currentCollection);
  }
  getAll=  async() =>{
    try {            
        const data= await this.currentCollection.get();
        const dataDos = data.docs;
        const result = dataDos.map(docu=>docu.data())
        return {status:"success",payload:result}
    } catch (error) {
        return {status:"error",error:"No se pudo obtener la información solicitada: " + error }
    }
}

getById = async (id)=>{
    try {
        const data = this.currentCollection.doc(id);
        let result = await data.get()
        let docs = result.data()
        if (docs!= undefined) {                
            return {status:"success",payload:docs}
        }else{
            return {status:"success", message:"El id solicitado no tiene información"}
        }
    } catch (error) {
        return {status:"error",message:"Error al obtener el documento: "}
    }
}

register= async (body)=>{

    try {
        let doc = this.currentCollection.doc()
        let result = await doc.set(body)
        return {status: "succese", message: "Registro Creado", payload:result} 
    } catch (error) {
        console.log(error)
        return {status:"error",error:"No se pudo obtener la información solicitada: " + error }
    }
}

update = async (id,body)=>{
    try {
        let doc = this.currentCollection.doc(id);
        let result = await doc.update(body)
        return {status:"success",payload:result, message:'Cambios Realizados'}
    } catch (error) {
        return {status:"error",message:"Error al obtener el documento: "}
    }
}

delete = async (id)=>{
    try {
        let doc = this.currentCollection.doc(id);
        await doc.delete();
        return {status:"success",message:'Eliminado Exitosamente'}
    } catch (error) {
        console.log(error)
        return {status:"error",message:"Error al obtener el documento: "}
    }
}


registerCarrito = async (body)=>{
    let id= body.id
    try {
        let doc = this.currentCollection.doc()
        let result = await doc.set(id)
        return {status: "success", message: "Registro Creado", payload:result} 
    } catch (error) {
        console.log(error)
        return {status:"error",error:"No se pudo obtener la información solicitada: " + error }
    }
}
agregarProductoAlCarrito = async (id,body)=>{
    try {
        let doc = this.currentCollection.doc(id);
        
        let result = await doc.get()
        let docs = result.data()
        if (!docs) {
            return {status:"error",message:"No se agregó producto al Carrito: "+error}
        }else{
            let result = await doc.update(body)
            return {status : "success", message : "Producto Agregado", payload:result}
        }
    } catch (error) {
        return {status:"error",message:"No se agregó producto al Carrito: "+error}
    }
}

delete = async (id)=>{
    try {
        let doc = this.currentCollection.doc(id);
        
        let result = await doc.get()
        let docs = result.data()
        if (!docs) {
            return {status:"error",message:"Error al obtener el documento: "+ error}
        }else{
            await doc.delete();
            return {status:"success", payload:docs,message:'Eliminado Exitosamente'}
        }
    } catch (error) {
        console.log(error)
        return {tatus:"error",message:"Error al obtener el documento: "+ error}
    }
}

 
registerCarrito = async (body)=>{
    try {
        if (body.id) {                
            let objeto = {products: [body.id]} 
            let doc = this.currentCollection.doc()
            let result = await doc.set(objeto)
            return {status:"success",payload:result} 
        }else{
            let objeto = {products: []} 
            let doc = this.currentCollection.doc()
            let result = await doc.set(objeto)
            return {status:"success",payload:result} 
        }
    } catch (error) {
        console.log(error)
        return {status:"error", message: "Error al obtener el documento: "+ error}
    }
}

agregarProductoAlCarrito = async (idCart,idProduct)=>{
    let doc = this.currentCollection.doc(idCart);
    let data = await doc.get()
    let docs = data.data()
    let array=docs.products
    if (array.some(element => element === idProduct)){
        return {satatus:'error', message: "Producto Existente"}
    }else{
        let nuevo =[...array,idProduct]
        let result = await doc.update({products:nuevo})
        return {status:"success",payload:result, message:'Producto Agregado'}
    }
}

deleteProductodeCarrito = async (idCart,idProduct)=>{
    let doc = this.currentCollection.doc(idCart);

    let data = await doc.get()
    let docs = data.data()
    if (!docs) {
        return {status:"error", message:"Error de ID del cars"}
    }else{
        let array=docs.products
        if (array.some(element => element === idProduct)){
            let nuevo= array.filter(element=> element != idProduct)
            let result = await doc.update({products:nuevo})
            return {status:"success",payload:result, message:'Producto Eliminado Exitosamente!'}
        }else{
            return {satatus:'error', message: "Producto No encontrado"}
            
        }
    }
}

}