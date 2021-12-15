import database from "../config.js";

export default class Products{
    constructor(){
        database.schema.hasTable('message').then(result=>{
            if(!result){ // Si no existe la tabla en la DB, Crearla
                database.schema.createTable('message',table=>{
                    table.increments();//gestion del ID
                    table.string('name').notNullable();
                    table.string('messege').notNullable();
                    table.timestamps(true,true); //registro del momento que se ha realizado alguna tarea
                }).then(result=>{
                    console.log("Tabla Mensajes Creada")
                })
            }
        })
    }  
}