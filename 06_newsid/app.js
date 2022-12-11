import {app} from './firebase.js '

import { getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInAnonymously,
  RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
 
let user=null;
const auth = getAuth(app);




onAuthStateChanged(auth, (user) =>{
  const containe=document.querySelector("#container");
  checarEstado(user);
  if(user){
    containe.innerHTML=`<h1>BIENVENIDO: ${user.email}</h1>
    <button  type="button" data-bs-toggle="modal" data-bs-target="#addModal"  class="btn btn-primary btn-lg">Agregar Alumno   <i class="bi bi-person-plus"></i></button>

    <br>
<br>
<table id="container3">
    <thead>
    <tr>
      <th><h1>No.Control</h1></th>
      <th><h1>Nombre</h1></th>
      <th><h1>Apellido P</h1></th>
      <th><h1>Apellido M</h1></th>
      <th><h1>Carrrera</h1></th>
      <th><h1>Editar</h1></th>
      <th><h1>Eliminar</h1></th>
      <th><h1>QR</h1></th>
    </tr>
  </thead>
    <table id="container2">
  
      
          </table>
    
    
    `
    const uid= user.uid;
  } else{
    containe.innerHTML=`<h1>No hay usuarios  <i class="bi bi-person-exclamation"></i></h1>`
  }
})

const btnFone=document.querySelector("#telfonoini");
btnFone.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    const {value:tel}=await Swal.fire({
      title: 'Place your phone number',
      input: 'tel',
      inputLabel: 'Phone',
      inputValue: '+525569696969',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Send verify code',
      showCancelButton: true,
    })
    window.recaptchaVerifier=new RecaptchaVerifier('recaptcha', {'size':'invisible'}, auth);
    const appVerifier=window.recaptchaVerifier;
    const confirmationResult=await signInWithPhoneNumber(auth, tel, appVerifier)
    console.log(confirmationResult);
    window.confirmationResult=confirmationResult;
    const {value:code}=await Swal.fire({
      title: 'Place your verify code',
      input: 'text',
      inputLabel: 'Code',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Verify',
      showCancelButton: true,
    })

    const result=await window.confirmationResult.confirm(code)
    user=result.user;
    checarEstado(user)

  }catch(error){
    Swal.fire('Don´t is possible login whit your number phone');
  }
  });


const btngogle  =document.querySelector("#btngo")
btngogle.addEventListener('click', async(e)=>{
e.preventDefault();
const provider = new GoogleAuthProvider();
try{
  const credentials= await signInWithPopup(auth, provider)
  user=credentials.user;
  const modalInstance = bootstrap.Modal.getInstance(btngogle.closest('.modal'));
  modalInstance.hide();
  checarEstado(user)
} catch(error){
  console.log(error);
}

});




const btnAnonimo=document.querySelector("#btinco");
btnAnonimo.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    const result= await signInAnonymously(auth);
    console.log(result);
    user=result.user;
    bootstrap.Modal.getInstance(document.getElementById('iniciarModal')).hide();
  }catch(error){
    Swal.fire('Error Al iniciar secion de anonimo')
  }

});

const checarEstado=(user=null)=>{
  console.log(user);
  if(user== null){
  document.querySelector("#crear").style.display="block";
  document.querySelector("#iniciar").style.display="block";
  document.querySelector("#telfonoini").style.display="block";
  document.querySelector("#cerrar").style.display="none";
  document.querySelector("#sqes").style.display="none";
  }else{
document.querySelector("#crear").style.display="none";
document.querySelector("#iniciar").style.display="none";
document.querySelector("#telfonoini").style.display="none";
document.querySelector("#cerrar").style.display="block";
document.querySelector("#sqes").style.display="block";
  }
}



const btncr=document.querySelector("#cerrar");
btncr.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    await signOut(auth)
    checarEstado()
  } catch(error){
    console.log(error)
  }
});



const btnini=document.querySelector("#btniniciar");
btnini.addEventListener('click', async(e)=>{
  e.preventDefault();
  
  const email=document.querySelector("#iniciaremail");
  const password=document.querySelector("#iniciarcontra");
try{
  const res= await signInWithEmailAndPassword(auth, email.value, password.value)
user=res.user;
Swal.fire('Bienvenido <i class="bi bi-person-check-fill"></i>')
var myModalEl = document.getElementById('iniciarModal');
var modal=bootstrap.Modal.getInstance(myModalEl)
modal.hide();

}
catch(error){
  Swal.fire('Usuario y o contraseña incorrecto')
}
});


const btncrearcuenta=document.querySelector("#btncrear");
btncrearcuenta.addEventListener('click', async(e)=>{
  e.preventDefault();
const email=document.querySelector("#crearemail");
const password=document.querySelector("#crearcontra");
//console.log(email.value,password.value);
var myModalEl=document.getElementById('crearModal');
var modal=bootstrap.Modal.getInstance(myModalEl)

try{
  const respuesta=await createUserWithEmailAndPassword (auth, email.value, password.value)
//console.log(respuesta.user);
Swal.fire({
  icon: 'success',
  title: 'exito',
  text: 'la cuenta se registro correctamente',
})
email.value='';
password.value=''
modal.hide();
}catch (error){
console.log(error.code);
const code=error.code;
if (code==='auth/invalid-email'){
  Swal.fire({
      icon: 'error',

      text: 'correo electronico invalido',
        })
}
if (code==='auth/weak-password'){
  Swal.fire({
      icon: 'error',
  
      text: 'contraseña invalida',
        })
}
if (code==='auth/email-already-in-user'){
  Swal.fire({
      icon: 'error',
    
      text: 'correo electronico ya en uso',
        })
}
}});




checarEstado();



