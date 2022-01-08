// import fs from 'fs';
// import __dirname from '../utils.js';

// const prodURL = __dirname+'/files/productos.txt';
// const userURL = __dirname+'/files/users.txt';

// class ContenedorProductos{
//     async registerProductos(prod){
//         try{
//             let data = await fs.promises.readFile(prodURL,'utf-8');
//             let prods = JSON.parse(data);
//             let id = prods[prods.length-1].id+1;
//             prod =Object.assign({id:id},prod);
//             prods.push(prod)
//             try{
//                 await fs.promises.writeFile(prodURL,JSON.stringify(prods,null,2));
//                 return {status:"success",message:"Producto registrada"}
//             }catch{
//                 return {statis:"error",message:"No se pudo registrar a el producto"} 
//             }
//         }catch{
//             prod = Object.assign({id:1},prod)
//             try{
//                 await fs.promises.writeFile(prodURL,JSON.stringify([prod],null,2));
//                 return {status:"success", message:"Producto registrado"}
//             }
//             catch{
//                 return {status:"error",message:"No se pudo registrar a el producto"}
//             }
//         }
//     }
//     async registerUser(user){
//         try{
//             let data = await fs.promises.readFile(userURL,'utf-8');
//             let users = JSON.parse(data);
//             let id = users[users.length-1].id+1;
//             user = Object.assign({id:id},user);
//             users.push(user);
//             try{
//                 await fs.promises.writeFile(userURL,JSON.stringify(users,null,2));
//                 return {status:"success",message:"Usuario registrado"}
//             }catch{
//                 return {statis:"error",message:"No se pudo registrar al usuario"} 
//             }
//         }catch{
//             user = Object.assign({id:1},user)
//             try{
//                 await fs.promises.writeFile(userURL,JSON.stringify([user],null,2));
//                 return {status:"success", message:"Usuario registrado"}
//             }
//             catch{
//                 return {status:"error",message:"No se pudo registrar al usuario"}
//             }
//         }
//     }
//     async getAllProductos(){
//         try{
//             let data = await fs.promises.readFile(prodURL,'utf-8');
//             let prods = JSON.parse(data);
//             return {status:"success",payload:prods}
//         }catch{
//             return {status:"error",message:"Error al obtener los productos. Intente más tarde"}
//         }
//     }
//     async getAllUsers(){
//         try{
//             let data = await fs.promises.readFile(userURL,'utf-8');
//             let users = JSON.parse(data);
//             return {status:"success",payload:users}
//         }catch{
//             return {status:"error",message:"Error al obtener los usuarios. Intente más tarde"}
//         }
//     }
//     async getProductById(id){
//         try{
//             let data = await fs.promises.readFile(prodURL,'utf-8');
//             let prods = JSON.parse(data);
//             let prod = prods.find(v => v.id===id)
//             if(prod){
//                 return {status:"success", payload:prod}
//             }else{
//                 return {status:"error",message:"Producto no encontrado"}
//             }
//         }catch{
//             return {status:"error",message:"Error al obtener el producto"}
//         }
//     }
//     async getUserById(id){
//         try{
//             let data = await fs.promises.readFile(userURL,'utf-8');
//             let users = JSON.parse(data);
//             let user = users.find(v => v.id===id)
//             if(user){
//                 return {status:"success", payload:user}
//             }else{
//                 return {status:"error",message:"Usuario no encontrado"}
//             }
//         }catch{
//             return {status:"error",message:"Error al obtener al usuario"}
//         }
//     }
//     async updateUser(id,body){
//         try{
//             let data = await fs.promises.readFile(userURL,'utf-8');
//             let users = JSON.parse(data);
//             if(!users.some(user=>user.id===id)) return {status:"error", message:"No hay ningún usuario con el id especificado"}
//             let result = users.map(user=>{
//                 if(user.id===id){
//                     if(user){
//                         body = Object.assign({id:user.id,...body})
//                         return body
//                     }
//                     else{
//                         body = Object.assign({id:user.id,...body})
//                         return body;
//                     }
//                 }else{
//                     return user;
//                 }
//             })
//             try{
//                 await fs.promises.writeFile(userURL,JSON.stringify(result,null,2));
//                 return {status:"success", message:"Usuario actualizado"}
//             }catch{
//                 return {status:"error", message:"Error al actualizar el usuario"}
//             }
//         }catch{
//             return {status:"error",message:"Fallo al actualizar el usuario"}
//         }
//     }
//     async updateProducto(id,body){
//         try{
//             let data = await fs.promises.readFile(prodURL,'utf-8');
//             let prods = JSON.parse(data);
//             if(!prods.some(pt=>pt.id===id)) return {status:"error", message:"No hay productos con el id especificado"}
//             let result = prods.map(prod=>{
//                 if(prod.id===id){
//                     if(prod){
//                         body = Object.assign({id:prod.id,...body});
//                         return body;
//                     }
//                     else{
//                         body = Object.assign({id:id,...body})
//                         return body;
//                     }
//                 }else{
//                     return prod;
//                 }
//             })
//             try{
//                 await fs.promises.writeFile(prodURL,JSON.stringify(result,null,2));
//                 return {status:"success", message:"producto actualizada"}
//             }catch{
//                 return {status:"error", message:"Error al actualizar el producto"}
//             }
//         }catch(error){
//             return {status:"error",message:"Fallo al actualizar el producto: "+error}
//         }
//     }
//     async deleteProducto(id){
//         try{
//             let data = await fs.promises.readFile(prodURL,'utf-8');
//             let prods = JSON.parse(data);
//             if(!prods.some(prod=>prod.id===id)) return {status:"error", message:"No hay producto con el id especificado"}
//             //let prod = prods.find(v=>v.id===id);
            
//             let aux = prods.filter(prod=>prod.id!==id);
//             try{
//                 await fs.promises.writeFile(prodURL,JSON.stringify(aux,null,2));
//                 return {status:"success",message:"Producto Eliminado"}
//             }catch{
//                 return {status:"error", message:"No se pudo eliminar el producto"}
//             }
//         }catch{
//             return {status:"error", message:"Fallo al eliminar el producto"}
//         }
//     }  
//     async deleteUser(id){
//         try{
//             let data = await fs.promises.readFile(userURL,'utf-8');
//             let users = JSON.parse(data);
//             if(!users.some(us=>us.id===id)) return {status:"error", message:"No hay ningún usuario con el id proporcionado"}
//             let user = users.find(us=>us.id===id);
//             if(user){
//                 try{
//                     let prodData = await fs.promises.readFile(prodURL,'utf-8');
//                     let prods = JSON.parse(prodData);
//                     prods.forEach(prod=>{
//                         if(prod.owner===id){
                            
//                             delete prod['owner']
//                         }
//                     })
//                     await fs.promises.writeFile(prodURL,JSON.stringify(prods,null,2));
//                 }catch{
//                     return {status:"error", message:"fallo al eliminar el usuario"}
//                 }
//             }
//             let aux = users.filter(user=>user.id!==id);
//             try{
//                 await fs.promises.writeFile(userURL,JSON.stringify(aux,null,2));
//                 return {status:"success",message:"Usuario eliminado"}
//             }catch{
//                 return {status:"error", message:"No se pudo eliminar la producto"}
//             }
//         }
//         catch{
//             return {status:"error",message:"Fallo al eliminar el usuario"}
//         }
//     }
// }

// export default ContenedorProductos;