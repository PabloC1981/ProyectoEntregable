import database from "../config.js";

export default class Message{
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
    async saveMessage (messages) {
        try {
          let message = await database.table('message').insert(messages)
          return { status: 'success', payload: message, mensaje:"Mensaje Registrado" }
        } catch (err) {
          console.log(`Error: ${err}`)
          return { status: 'error', message: err.message }
        }
      }
    
      async getMessages () {
        try {
          const chats = await database.select().table('message')
          return { status: 'success', payload: chats }
        } catch (err) {
          console.log(`Error: ${err}`)
          return { status: 'error', message: err.message }
        }
      }  
}