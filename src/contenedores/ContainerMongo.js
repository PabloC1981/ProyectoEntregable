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
            let docs = await this.collection.find({ '_id': id }, { '__v': 0 });
            if(docs.length === 0){
                return {status:"success", message:"El id solicitado no tiene información"}
            }else{
                return{status:"succese", payload:documents}
            }
        }catch{
            return {status:"error",message:"Error al obtener el documento: "}
        }
    }
}
