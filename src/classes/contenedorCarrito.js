import fs from 'fs';
import __dirname from '../utils.js';

const prodURL = __dirname+'/files/productos.txt';
const userURL = __dirname+'/files/users.txt';
const carritoURL = __dirname+'/files/carrito.txt';

class ContenedorCarrito{

    async registerCarrito(car){
        try{
            let data = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data);
            let id = carrs[carrs.length-1].id+1;
            car =Object.assign({id:id,productos:[]},car);
            carrs.push(car)
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(carrs,null,2));
                return {status:"success",message:"Carrito Registrado"}
            }catch{
                return {statis:"error",message:"No se pudo registrar el carrito"} 
            }
        }catch{
            car =Object.assign({id:1,productos:[]},car);
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify([car],null,2));
                return {status:"success", message:"Carrito Registrado"}
            }
            catch{
                return {status:"error",message:"No se pudo registrar el carrito"}
            }
        }
    }
    async getAllProductosCarrito(id){
        try{
            let data = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data);
            let aux = carrs.filter(carr=>carr.id==id)
            if(!carrs.some(carr=>carr.id===id)){ 
                return {status:"error", message:"No hay Venta con el id especificado"}
            }else
            return {status:"success",payload:aux}
        }catch{
            return {status:"error",message:"Error al obtener los productos. Intente más tarde"}
        }
    }
    async updateCarrito(body){
        try{
            let data = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data);
            body =Object.assign(body);
            carrs.push(body)
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(carrs,null,2));
                return {status:"success", message:"carrito actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar el carrito"}
            }
        }catch(error){
            return {status:"error",message:"Fallo al actualizar el carrito: "+error}
        }
    }
    async deletecarrito(id){
        try{
            let data = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data);
            if(!carrs.some(carr=>carr.id===id)) return {status:"error", message:"No hay Venta con el id especificado"}

            let aux = carrs.filter(carr=>carr.id!==id);
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(aux,null,2));
                return {status:"success",message:"Carrito Eliminado"}
            }catch{
                return {status:"error", message:"No se pudo eliminar el Carrito"}
            }
        }catch{
            return {status:"error", message:"Fallo al eliminar el Carrito"}
        }
    } 
    async agregarProductoAlCarrito(id,body){
        
        try{
            console.log("viene", body)
            let dataprod = await fs.promises.readFile(prodURL,'utf-8');
            let datacarrito = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(datacarrito);
            let prods = JSON.parse(dataprod);
            if(!carrs.some(cr=>cr.id===id)){
            return {status:"error", message:"No hay carritos con el id especificado"}
            }else{
                
                let carro = carrs.filter(v=>v.id===id)
                if (!carro[0].productos.some(v=>v.id===body.id)){
                    let prod = prods.filter(v=>v.id===body.id)
                    console.log(prod)
                    let carro_add = {
                        "id": body.id,
                        "title": prod[0].title,
                        "price": prod[0].price,
                        "cantidad":body.cantidad
                    }
                    console.log("Detalle",carro_add)
                    carro[0].productos.push(carro_add)
                    console.log("Llenando carro",carro)
                    //carrs.push(carro[0])
                }else{
                    let detalle = carro[0].productos.filter(v=>v.id===body.id)
                    detalle[0].cantidad =eval( eval(detalle[0].cantidad) + eval(body.cantidad))
                    //carro[0].productos.push(detalle[0])
                }
                
                try{
                    await fs.promises.writeFile(carritoURL,JSON.stringify(carrs,null,2));
                    return {status:"success", message:"carrito actualizado"}
                }catch{
                    return {status:"error", message:"Error al actualizar el carrito"}
                }  
            }
        
        }catch(error){
            return {status:"error",message:"Fallo al actualizar el carrito: "+error}
        }
    }
    async deletecarritoYproducto(id){
        try{
            let data = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data);
            if(!carrs.some(carr=>carr.id===id)) return {status:"error", message:"No hay Venta con el id especificado"}
            //let carr = carrs.find(v=>v.id===id);
            
            let aux = carrs.filter(carr=>carr.id!==id);
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(aux,null,2));
                await fs.promises.writeFile(prodURL,JSON.stringify(aux,null,2));
                return {status:"success",message:"Carrito Eliminado"}
            }catch{
                return {status:"error", message:"No se pudo eliminar el Carrito"}
            }
        }catch{
            return {status:"error", message:"Fallo al eliminar el Carrito"}
        }
    } 
    
    
}

export default ContenedorCarrito;