import ContainerMongo from '../../contenedores/ContainerMongo.js'
import Schema from "mongoose"

export default class CarsMongo extends ContainerMongo{
    constructor(){
        super('cars',
        {
            products:{
                type:[{
                    type:Schema.Types.ObjectId,
                    ref:'products'
                }],
                default:[]
            }
        },{timestamps:true}
        )
    }
}