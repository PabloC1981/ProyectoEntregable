import mongoose from 'mongoose'
import config from '../config.js'

mongoose.connect(config.mongo.baseUrl,{useNewUrlParser: true,useUnifiedTopology: true,})

export default class MongoContainter{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }
    getAll = async() => {
        try{
            let documents = await this.collection.find()
            return{status:"succese", payload:documents}
        }catch(error){
            return {status:"error",error:"No se pudo obtener la información solicitada: " + error  }
        }
    }
    register = async(object) =>{
        try{
            let result = await this.collection.create(object)
            return {status: "succese", message: "Registro Creado", payload:result}
        }catch(error){
            return {status:"error",error:"No se pudo obtener la información solicitada: " + error  }
            
        }
    } 
    getById = async(id) =>{
        try{
            let docs = await this.collection.findById({ '_id': id }, { '__v': 0 });
            if(docs.length === 0){
                return {status:"success", message:"El id solicitado no tiene información"}
            }else{
                return{status:"success", payload:docs}
            }
        }catch{
            return {status:"error",message:"Error al obtener el documento: "}
        }
    }
    update = async(id,body) =>{
        try{
            let docs = await this.collection.findById({ '_id': id }, { '__v': 0 });
            if(docs.length === 0){
                return {status:"success", message:"El id solicitado no tiene información"}
            }else{
                let docs = await this.collection.findByIdAndUpdate(id, { $set: body })
                return{status:"success", payload:docs}
            }
        }catch(error){
            return {status:"error",message:"Error al obtener el documento: " + error}
        }
    }
    
    ////////
    registerCarrito = async(object) => {
        try{
            let result = await this.collection.create(object)
            return {status: "success", message: "Registro Creado", payload:result}
        }catch(error){
            return {status:"error",error:"No se pudo obtener la información solicitada: " + error  }
            
        }
        
    }
    agregarProductoAlCarrito = async(carId,prodId) => {
        try{
            let result = await this.collection.updateOne({_id:carId},{$push:{products:prodId}})
            return {status : "success", message : "Producto Agregado", payload:result}
        }catch(error){
            return {status:"error",message:"No se agregó producto al Carrito: "+error}
        }
    }
    delete = async(id) =>{
        try{
            let docs = await this.collection.deleteOne({ '_id': id }, { '__v': 0 });
            if(docs.length === 0){
                return {status:"success", message:"El id solicitado no tiene información"}
            }else{
                return{status:"success", payload:docs}
            }
        }catch(error){
            return {status:"error",message:"Error al obtener el documento: "+ error}
        }
    } 
    deleteProductodeCarrito = async(carId,prodId) => {
        try{
            let docs = await this.collection.deleteOne({ '_id': carId }, { '__v': 0 })
            if(docs.length === 0){
                return {status:"success", message:"El id solicitado no tiene información"}
            }else{    
                return {status : "success", message : "Producto Eliminado ", payload:docs}
            }
        }catch(error){
            return {status:"error",message:"Error al intentar borrar el Carrito: "+error}
        }
    }
}
