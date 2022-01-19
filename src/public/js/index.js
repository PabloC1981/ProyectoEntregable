
const socket = io();
//---------------------------IMPLEMENTACION DE EVENTOS DE SOCKET --------------------------------------
socket.on('updateProd',data=>{
    //console.log(data)
    let prod = data.payload;
    //console.log(prod)
    fetch('templates/ProducTable.handlebars').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject={
            prod:prod
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('prodTable');
        div.innerHTML=html;
    })
})
// document.addEventListener('submit',enviarFormulario);

// function enviarFormulario(event){
//     event.preventDefault();
//     let form= document.getElementById('productoForm');
//     let data = new FormData(form);
//     fetch('/api/productos',{
//         method:'POST',
//         body: data,
//     }).then(result=>{
//         return result.json();
//     }).then(json=>{
//         Swal.fire({
//             title:'Éxito',
//             text:json.message,
//             icon:'success',
//             timer:2000,
//         }).then(result=>{
//             //location.href='/'
//         })
//     })
// }
document.getElementById("image").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡Verificar Imagen Correcta!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}

//ChatLaboro
let input = document.getElementById('mensaje');
let user = document.getElementById('user')
let email = document.getElementById('email')

function validarEmail(em){
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido= expReg.test(em);
    return esValido;
}   

input.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            if (user.value==='') {
                return alert('Coloca el Usuario!')
            }
            else if(email.value===''){
                    return alert('Es obligatorio el mail!')
                }
                else if (validarEmail(email.value)!= true) {
                    return alert('verifica tu correo por favor')    
                }
            socket.emit('message',{user:user.value,message:e.target.value});
            document.getElementById("mensaje").value="";
        } 
    }
})
socket.on('messagelog',data=>{
    let p = document.getElementById('log')
    let mensajes = data.map(msg=>{
        return `<div><span>${msg.message.user}</b>dice: </b>${msg.message.message}</b></span></div>`
    }).join('');
    p.innerHTML=mensajes;
    
})




