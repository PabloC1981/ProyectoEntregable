import Schema  from "mongoose";
import ContainerMongo from "../../contenedores/ContainerMongo.js";

export default class chatMongo extends ContainerMongo{
    constructor(){
        super('chats', 
            {
                author: {
                    type: Schema.Types.ObjectId,
                    ref:'users',
                    require:true
                },
                message: {type:String , 
                require:true
                },    
            },{timestamps:true}
        )
    }
}

