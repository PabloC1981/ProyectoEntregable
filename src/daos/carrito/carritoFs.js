import ContainerFs from "../../contenedores/ContainerFs.js";

export default class carritoFs extends ContainerFs{
    constructor(){
        super('carrito.txt');
    }
}