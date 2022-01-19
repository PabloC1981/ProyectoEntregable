import ContainerMongo from "../../contenedores/ContainerMongo.js";

export default class usersMongo extends ContainerMongo{
    constructor(){
        super('users',
            {
            first_name:{
                type:String,
                required:true,
            },
            last_name:{
                type:String,
                required:true,
            },
            age:{
                type:Number
            },
            username:{
                type:String,
                default:"anonymus",
                unique:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true
            }
        },{timestamps:true}
        )
    }
}