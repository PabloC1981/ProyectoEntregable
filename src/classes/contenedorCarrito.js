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
            
            car =Object.assign({id:id},car);
            carrs.push(car)
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(carrs,null,2));
                return {status:"success",message:"Carrito Registrado"}
            }catch{
                return {statis:"error",message:"No se pudo registrar el carrito"} 
            }
        }catch{
        
            car = Object.assign({id:1},car)
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
            let data = await fs.promises.readFile(prodURL,'utf-8');
            let data1 = await fs.promises.readFile(carritoURL,'utf-8');
            let carrs = JSON.parse(data1);
            let prods = JSON.parse(data);
            if(!carrs.some(cr=>cr.id===id)) return {status:"error", message:"No hay carritos con el id especificado"}
            let prod = prods.filter(v=>v.id===body)
            console.log(prod)
            carrs.push(prod)
            console.log(carrs)
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