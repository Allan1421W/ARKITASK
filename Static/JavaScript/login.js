const firebaseConfig = {
    apiKey: "AIzaSyBFyQXP99eBMj0sQuABfcr7sHQn51ywE7U",
    authDomain: "arkitask2.firebaseapp.com",
    databaseURL: "https://arkitask2-default-rtdb.firebaseio.com",
    projectId: "arkitask2",
    storageBucket: "arkitask2.appspot.com",
    messagingSenderId: "558206073756",
    appId: "1:558206073756:web:aa50c3e2f4d341fbcde659",
    measurementId: "G-1KM9F1VB5F"
  };
//Referencias


firebase.initializeApp(firebaseConfig);
firebase.analytics();


const userRef = firebase.database().ref('Usuarios/Login')

// Instanciamos la variables de login
const emailbox = document.getElementById('email');
const passwordbox = document.getElementById('password');
const selBtn = document.getElementById('signup');
let validacionExiste = false;
let rol = ""
const selectData = async (e) => {
        await userRef.on('value', (students) => {
            students.forEach((student) =>{
                let studentData = student.val()
                if ( emailbox.value == studentData.Correo && passwordbox.value == studentData.Password) {
                    if (studentData.Rol == "Cliente") {
                        rol = "Cliente"
                        validacionExiste = true
                    }else if((studentData.Rol == "Gerente")){
                        rol = "Gerente"
                        validacionExiste = true
                    }
                    else if((studentData.Rol == "Administrador")){
                        rol = "Administrador"
                        validacionExiste = true
                    }
                    else if((studentData.Rol == "Encargado")){
                        rol = "Encargado"
                        validacionExiste = true
                    }
                    else if((studentData.Rol == "Ingeniero")){
                        rol = "Ingeniero"
                        validacionExiste = true
                    }else{
                        alert("El rol no existe cambielo")
                    }
                }else if(!(validacionExiste = true)){
                    validacionExiste = false
                }
            })
            console.log(validacionExiste);
            if (validacionExiste == false) {
                alert("El correo o la contraseña es incorrecta verifique")
            }else if(rol == "Cliente"){
                selBtn.innerHTML += `
                    <a href="../Template/cliente_.html" style="text-decoration: none; color: black;">Iniciar</a>
                `
                console.log("Cliente");
            }else if(rol == "Gerente"){
                selBtn.innerHTML += `
                        <a href="../Template/gerente_.html" style="text-decoration: none; color: black;">Iniciar</a>
                        `
                console.log("Gerente");
            }
            else if(rol == "Administrador"){
                selBtn.innerHTML += `
                        <a href="../Template/administrador_.html" style="text-decoration: none; color: black;">Iniciar</a>
                        `
                console.log("Administrador");
            }
            else if(rol == "Encargado"){
                selBtn.innerHTML += `
                        <a href="../Template/encargado_.html" style="text-decoration: none; color: black;">Iniciar</a>
                        `
                console.log("Encargado");
            }else if(rol == "Ingeniero"){
                selBtn.innerHTML += `
                        <a href="../Template/ingeniero_.html" style="text-decoration: none; color: black;">Iniciar</a>
                        `
                console.log("Ingeniero");
            }
            
        })
        
        
}

document.getElementById('container')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   selBtn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_fhx39sa';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      selBtn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      selBtn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});



selBtn.addEventListener('click', selectData)