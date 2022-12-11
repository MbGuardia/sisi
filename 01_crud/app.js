const cargarPosts=async()=>{
let url="https://jsonplaceholder.typicode.com/posts";
const api=await fetch(url);
const data=await api.json();
console.log(data);
tabla=document.querySelector("#lista");
data.map(item=>{ 
tabla.innerHTML+=`
<tr>
                <td scope="row">${item.id}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
                <td><button type="button" class="btn btn-primary"   onclick="cargarPost(${item.id})" data-bs-toggle="modal" data-bs-target="#Sexoo"><i class="bi bi-pencil-square"></i>editar</button></td>
                <td><button type="button" class="btn btn-danger"   onclick="eliminarPost(${item.id})" data-bs-toggle="modal" data-bs-target="#Sexoo2"><i class="bi bi-trash"></i>eliminar</button></td>
    </tr>


`})
}
const cargarPost=async(id)=>{    
    const api= await fetch('https://jsonplaceholder.typicode.com/posts/'+id);
    const respuesta=await api.json();
    console.log(respuesta);
    document.querySelector("#tedit").value=respuesta.title;
    document.querySelector("#edibody").value=respuesta.body;
    document.querySelector("#eid").value=respuesta.id;
    document.querySelector("#euserid").value=respuesta.userId;
}
const guardarPost=async()=>{    

    let title=document.querySelector("#tedit").value;
    let body=document.querySelector("#edibody").value;
    let idd=document.querySelector("#eid").value;
    let userid=document.querySelector("#euserid").value;
    const post={
        title:title,
        body:body,
        id:idd,
        userId:userid
    }
    const api=await fetch('https://jsonplaceholder.typicode.com/posts/'+idd, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const respuesta=api.json();
    if(respuesta!=null){
        Swal.fire({
            icon: 'success',
            title: 'EDITAR',
            text: 'SE ACTUALIZO CORRECTAMENTE!!'
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'ALGO FALLO!!!'
        })
    }



    
}


const guardardata=async ()=>{
let titulo=document.querySelector("#title").value;
let body=document.querySelector("#body").value;
const post={title:titulo,body:body,userId:1};


    const api= await  fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify (post),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        });
const respuesta=await api.json();
console.log(respuesta)
tabla=document.querySelector("#lista");
tr=document.createElement("tr");

tr.innerHTML=`
<tr>
                <td scope="row">${respuesta.id}</td>
                <td>${respuesta.title}</td>
                <td>${respuesta.body}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Sexoo"  ><i class="bi bi-pencil-square"></i>editar</button></td>
                <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Sexoo2"><i class="bi bi-trash"></i>eliminar</button></td>
    </tr>
`
tabla.appendChild(tr);

if (respuesta!=null){
    Swal.fire({
        icon: 'success',
        title: 'Insertar',
        text: 'Se inserto correctamente',

      })
}
else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no se inserto algo fallo',

      })
}
    

}
const eliminarPost=(id)=>{
    document.querySelector("#deleteid").value=id;
}
const deletePost=async ()=>{
    const id=document.querySelector("#deleteid").value;
    const api=await fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
        method: 'DELETE',
    })
    const respuesta=api.json();
    console.log(respuesta)
    if(respuesta!=null){
        Swal.fire({
            icon: 'success',
            title: 'ELIMINAR',
            text: 'SE ELIMINO CORRECTAMENTE!!'
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERRO',
        } )}
}
