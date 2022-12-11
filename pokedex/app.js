const lispokes=async()=>{
    let url=" https://pokeapi.co/api/v2/pokemon/";
    const api= await fetch(url);
const data= await api.json();
console.log(data);
const combo=document.querySelector("#listpok")
const namepoke=document.querySelector("#nombrepoke")
data.results.map(id=>{
    combo.innerHTML+=` 
    <option value="${id.name}">${id.name}</option>
        `
        
    }); 
    
}

const mostpoke=async()=>{
    const valor=document.querySelector("#listpok").value;
    const api= await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
    const response= await api.json();
    console.log(response);
    
}