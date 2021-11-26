document.addEventListener('submit',enviarFormulario);

function enviarFormulario(event){
    event.preventDefault();
    let form= document.getElementById('productoForm');
    let data = new FormData(form);
    fetch('/api/productos',{
        method:'POST',
        body: data,
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:'Éxito',
            text:json.message,
            icon:'success',
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
}
document.getElementById("image").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡Verificar Imagen Correcta!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}

/*document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.getElementById('productoForm');
    let data = new FormData(form); //forma de enviar del front al Back
    let title = data.get('title');
    let price = data.get('price');
    let stock = data.get('stock');
    let status = data.get('status');
    let req = {
        title:title,
        price:price,
        stock:stock,
        status:status,
    }
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body: JSON.stringify(req),
        headers:{
            "Content-type":"application/json"
        }
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
})*/
