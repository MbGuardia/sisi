const listdogs=async()=>{
    const api= await fetch("https://dog.ceo/api/breeds/list/all");
    const response= await api.json();
    const combo=document.querySelector("#listd")
data=response.message;
console.log(data);
Object.keys(data).forEach(key=>{ 
    combo.innerHTML+=` 
<option value="${key}">${key}</option>
    `
});

}
const mostperro=async(raza)=>{
    const api= await fetch(`https://dog.ceo/api/breed/${raza}/images`);
    const response= await api.json();
    console.log(response.message);
    let div=document.querySelector("#perrito");
data=response.message;
div.innerHTML="";
data.map(imgPerrito=>{

div.innerHTML+=`
<img src="${imgPerrito}" >
`

})
}