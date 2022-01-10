//import Schema from "mongoose";
import ContainerMongo from "../../contenedores/ContainerMongo.js";

export default class chatMongo extends ContainerMongo{
    constructor(){
        super('chats', 
            {
                author:{
                    id: { type:String , require:true, },
                    name: {type:String, required:true },
                    last_name: {type:String, required:true } ,
                    age: {type:String, required:true } ,
                    alias:{type:String, required:true } ,
                    avatar: {type:String, required:true } ,
                },   
                message:{
                    type:String,
                    required:true
                },

            },{timestamps:true}
        )
    }
}

