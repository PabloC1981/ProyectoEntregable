import ContainerFirebase from "../../contenedores/ContainerFirebase.js";

export default class productsFirebase extends ContainerFirebase{
    constructor(){
        super('cars',
        {
            products:{
                type:[{
                    ref:'products'
                }],
                default:[]
            }
        },{timestamps:true}
        )
    }
}