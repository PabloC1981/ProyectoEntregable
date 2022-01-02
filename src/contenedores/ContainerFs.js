import fs from 'fs';
import config from '../config.js'


export default class ContainerFs{
        constructor(file_enpoint){
            this.url = `${config.fileSystem.baseUrl}${file_enpoint}`
        }
        register = async(obj) =>{
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let objects = JSON.parse(data);
                let id = objects[objects.length-1].id+1;
                obj = Object.assign({id:id},obj);
                objects.push(obj)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(objects,null,2));
                    return {status:"success",message:"Registro Exitoso"}
                }catch{
                    return {statis:"error",message:"No se pudo realizar la registración: "+ message} 
                }
            }catch{
                obj = Object.assign({id:1},obj)
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify([obj],null,2));
                    return {status:"success", message:"Registro Exitoso"}
                }
                catch{
                    return {status:"error",message:"No se pudo realizar la registración:" + message}
                }
            }
        }
        getAll = async() =>{
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                return {status:"success",payload:JSON.parse(data)}
            }catch{
                return {status:"error",error:"No se pudo obtener la información solicitada: " + error }
            }
        }
        getById = async(id) =>{
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let objects = JSON.parse(data);
                let search = objects.find(v => v.id===id)
                if(search){
                    return {status:"success", payload:search}
                }else{
                    return {status:"error",message:"El id solicitado no tiene información"}
                }
            }catch{
                return {status:"error",message:"Error al obtener el registro: "+ message}
            }
        }
        update = async (id,body) => {
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let objects = JSON.parse(data);
                if(!objects.some(info=>info.id===id)) return {status:"error", message:"No hay información con el id especificado"}
                let result = objects.map(obj=>{
                    if(obj.id===id){
                        if(obj){
                            body = Object.assign({id:obj.id,...body})
                            return body
                        }
                        else{
                            body = Object.assign({id:obj.id,...body})
                            return body;
                        }
                    }else{
                        return obj;
                    }
                })
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(result,null,2));
                    return {status:"success", message:"Actualizacion Exitosa"}
                }catch{
                    return {status:"error", message:"Error al actualizar "}
                }
            }catch{
                return {status:"error",message:"Fallo al actualizar"}
            }
        }
        delete = async(id) => {
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let objects = JSON.parse(data);
                if(!objects.some(obj=>obj.id===id)) return {status:"error", message:"No hay información con el id especificado"}
                //let prod = prods.find(v=>v.id===id);
                
                let aux = objects.filter(obj=>obj.id!==id);
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify(aux,null,2));
                    return {status:"success",message:"Registro Eliminado"}
                }catch{
                    return {status:"error", message:"Registro No Eliminado"}
                }
            }catch{
                return {status:"error", message:"Fallo al eliminar el Registro"}
            }
        }
        registerCarrito = async(car) => {
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let carrs = JSON.parse(data);
                let id = carrs[carrs.length-1].id+1;
                car =Object.assign({id:id,productos:[]},car);
                carrs.push(car)
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify(carrs,null,2));
                    return {status:"success",message:"Carrito Registrado"}
                }catch{
                    return {statis:"error",message:"No se pudo registrar el carrito"} 
                }
            }catch{
                car =Object.assign({id:1,productos:[]},car);
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify([car],null,2));
                    return {status:"success", message:"Carrito Registrado"}
                }
                catch{
                    return {status:"error",message:"No se pudo registrar el carrito"}
                }
            }
        }
        agregarProductoAlCarrito = async(id,body) => {
        
            try{
                let dataprod = await fs.promises.readFile(this.url,'utf-8');
                let datacarrito = await fs.promises.readFile(this.url,'utf-8');
                let carrs = JSON.parse(datacarrito);
                let prods = JSON.parse(dataprod);
                if(!carrs.some(cr=>cr.id===id)){
                return {status:"error", message:"No hay carritos con el id especificado"}
                }else{
                    
                    let carro = carrs.filter(v=>v.id===id)
                    if (!carro[0].productos.some(v=>v.id===body.id)){
                        let prod = prods.filter(v=>v.id===body.id)
                        let carro_add = {
                            "id": body.id,
                            "title": prod[0].title,
                            "price": prod[0].price,
                            "cantidad":body.cantidad
                        }
                        carro[0].productos.push(carro_add)
                        //carrs.push(carro[0])
                    }else{
                        let detalle = carro[0].productos.filter(v=>v.id===body.id)
                        detalle[0].cantidad =eval(eval(detalle[0].cantidad) + eval(body.cantidad))
                        //carro[0].productos.push(detalle[0])
                    }
                    
                    try{
                        await fs.promises.writeFile(this.url,JSON.stringify(carrs,null,2));
                        return {status:"success", message:"carrito actualizado"}
                    }catch{
                        return {status:"error", message:"Error al actualizar el carrito"}
                    }  
                }
            
            }catch(error){
                return {status:"error",message:"Fallo al actualizar el carrito: "+error}
            }
        } 
        deleteProductodeCarrito = async (idcarrito,idprod) => {
            try{
                let data = await fs.promises.readFile(this.url,'utf-8');
                let carrs = JSON.parse(data);
                if(!carrs.some(carr=>carr.id===idcarrito)){
                    return {status:"error", message:"No hay Venta con el id especificado"}
                //let carr = carrs.find(v=>v.id===id);
                }else{                
                    let carro = carrs.filter(carr=>carr.id===idcarrito);
                    if(!carro[0].productos.some(carr=>carr.id===idprod)){
                        return {status:"error", message:"El producto no Existe en el Carro"}
                    }else{
                    let aux = carro[0].productos.filter(prod=>prod.id!==idprod)
                    carro[0].productos = aux
    
                        try{
                            await fs.promises.writeFile(this.url,JSON.stringify(carrs,null,2));
                            return {status:"success",message:"Producto Eliminado"}
                        }catch{
                            return {status:"error", message:"No se pudo eliminar el Carrito"}
                        }
                    }
            }
            }catch{
                return {status:"error", message:"Fallo al eliminar el Carrito"}
            }
        }
        
}