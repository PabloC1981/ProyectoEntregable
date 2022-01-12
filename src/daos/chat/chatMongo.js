import ContainerMongo from "../../contenedores/ContainerMongo.js";

export default class chatMongo extends ContainerMongo{
    constructor(){
        super('chats', 
            {
                author: {type:Object , require:true, },
                message: {type:String , require:true, },    

            },{timestamps:true}
        )
    }
}

