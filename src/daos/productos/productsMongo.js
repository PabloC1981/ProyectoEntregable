import Schema from "mongoose";
import ContainerMongo from "../../contenedores/ContainerMongo.js";

export default class productsMongo extends ContainerMongo{
    constructor(){
        super('products', 
            {
            title:{
                type:String,
                required:true
            },
            codigo:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            stock:{
                type:Number,
                required:true,
            },
            status:{
                type:String,
                required:true
            },
            thumbnail:{
                type:String
                },
            cars:{
                    type:Schema.Types.ObjectId,
                    ref:'cars',
                    default:null
                }
            
            },{timestamps:true}
        )
    }
}