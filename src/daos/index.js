
//archivo gestor de daos//
let product;
let carrito;
let users;
let chats;

let persistence = "mongo";

switch(persistence){
    case "fileSystem":
        const {default:productsFs} = await import('./productos/productsFs.js');
        const {default:usersFs} = await import('./users/usersMongo.js') 
        const {default:carritoFs} = await import('./carrito/carritoFs.js')
    
        product = new productsFs();
        carrito = new carritoFs();
        users = new usersFs();
        break; 
    case "mongo":
        const {default:productsMongo} = await import('./productos/productsMongo.js'); 
        const {default:carsMongo} = await import('./carrito/carsMongo.js')
        const {default:chatMongo} = await import('./chat/chatMongo.js')
        const {default:usersMongo} = await import('./users/usersMongo.js')

        product = new productsMongo();
        carrito = new carsMongo();
        chats = new chatMongo();
        users = new usersMongo();

        break;
    case "firebase":
        const {default:productsFirebase} = await import('./productos/productsFirebase.js'); 
        const {default:carsFirebase} = await import('./carrito/carsFirebase.js')
    
        product = new productsFirebase();
        carrito = new carsFirebase();
        break;    

    default:
}
export {product,carrito,users,chats, persistence}