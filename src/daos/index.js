//archivo gestor de daos//
let product;
let carrito;
let users;
let persistence = "mongo";

switch(persistence){
    case "fileSystem":
        const {default:productsFs} = await import('./productos/productsFs.js');
        const {default:usersFs} = await import('./users/usersFs.js') 
        const {default:carritoFs} = await import('./carrito/carritoFs.js')
    
        product = new productsFs();
        carrito = new carritoFs();
        users = new usersFs();
        break; 
    case "mongo":
        const {default:productsMongo} = await import('./productos/productsMongo.js'); 
        const {default:carsMongo} = await import('./carrito/carsMongo.js')

        product = new productsMongo();
        carrito = new carsMongo();
        break;
    case "firebase":
        const {default:productsFirebase} = await import('./productos/productsFirebase.js'); 
        const {default:carsFirebase} = await import('./carrito/carsFirebase.js')
    
        product = new productsFirebase();
        carrito = new carsFirebase();
        break;    

    default:
}
export {product,carrito,users, persistence}