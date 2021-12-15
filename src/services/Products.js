import database from "../config.js";

export default class Products{
    constructor(){
        database.schema.hasTable('products').then(result=>{
            if(!result){ // Si no existe la tabla en la DB, Crearla
                database.schema.createTable('products',table=>{
                    table.increments();//gestion del ID
                    table.string('name').notNullable();
                    table.string('codigo').notNullable();
                    table.integer('price').notNullable();
                    table.integer('stock').notNullable();
                    table.string('thumbnail');
                    table.timestamps(true,true); //registro del momento que se ha realizado alguna tarea
                }).then(result=>{
                    console.log("Tabla de Productos Creada")
                })
            }
        })
        
    }
    getProducts = async () =>{
        try{
            let products = await database.select().table('products');
            return {status:"success",payload:products}
        }catch(error){
            return {status:"error",message:error}
        }
    }

    getProductById = async (id) =>{
        try{
            let product = await database.select().table('products').where('id',id).first();//solo se usa el first el primer elemento que cumpla con la clausula where
            if(product){ 
                return {status:"success",payload:product}
            }else{
                return {status:"error",message:"Product not found"}
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }

    registerProduct = async (producto) =>{
        try{ 
            let existe = await database.table('products').select().where('name',producto.name).first();
            if(existe) return {status:"error",message:"productos existente"}
            let result = await database.table('products').insert(producto)
            return {status:"success",payload:`Producto registrado con id: ${result[0]}`}
        }catch(error){
            console.log(error);
            return {status:"error", message:error}
        }
    }

    updateProducto = async (id,producto) =>{
        try{ 
            let result = await database.table('products').select().where('id', id).update(producto)
            console.log(result);
            return {status:"success",payload:`Producto actualizado: ${result}`}
        }catch(error){
            console.log(error);
            return {status:"error", message:error}
        }
    }

    deleteProducto = async (id) =>{
        try{ 
            let result = await database.table('products').select().del().where('id', id)
            console.log(result);
            return {status:"success",payload:'Producto no encontrado'}
        }catch(error){
            console.log(error);
            return {status:"error", message:error}
        }
    }
}