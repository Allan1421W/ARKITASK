
const $openClose = document.getElementById("open-close"),
      $aside = document.getElementById("aside");

$openClose.addEventListener("click",()=>{
    $aside.classList.toggle("desplegar")
})

$('.sections article').hide();  
$('.sections #tab1').show();
$('aside.tabs div a').click(function(){
    $('.sections article').hide();
    var activeTab = $(this).attr('href');
    $(activeTab).show();     
    return false;
});
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCZf2vgM1ElH5CXX6uY0HpTqTAiB5ryRwA",
//   authDomain: "no-sql-1657d.firebaseapp.com",
//   databaseURL: "https://no-sql-1657d-default-rtdb.firebaseio.com",
//   projectId: "no-sql-1657d",
//   storageBucket: "no-sql-1657d.appspot.com",
//   messagingSenderId: "160809081821",
//   appId: "1:160809081821:web:ee25bd95f07b86b620b434",
//   measurementId: "G-HWXVNTH7J3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// import{getDatabase, ref, get, set, child, update, remove}
// from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

// const db = getDatabase();

// //Referencias
// var idbox = document.getElementById("Idbox");
// var namebox = document.getElementById("Namebox");
// var lastNamebox = document.getElementById("LastNamebox");
// var agebox = document.getElementById("Agebox");
// var genbox = document.getElementById("Genbox");

// var insBtn = document.getElementById("Insbtn");
// var selBtn = document.getElementById("Selbtn");
// var updBtn = document.getElementById("Updbtn");
// var delBtn = document.getElementById("Delbtn");

// //Insercion de datos
// function InsertData(){
//   set(ref(db, "TheUsers/" + idbox.value),{
//       Id: idbox.value,
//       Name: namebox.value,
//       LastName: lastNamebox.value,
//       Age: agebox.value,
//       Gender: genbox.value
//   })
//   .then(()=>{
//     alert("datos insertados exitosamente");
//   })
//   .catch((error)=>{
//     alert("Fallo al insertar, error ", error)
//   })
// }

// //Seleccion de datos
// function SelectData() {
//   const dbref = ref(db);

//   get(child(dbref, "TheUsers/" + idbox.value)).then((snapshot)=>{
//     if(snapshot.exists()){
//       namebox.value = snapshot.val().Name;
//       lastNamebox.value = snapshot.val().LastName;
//       agebox.value = snapshot.val().Age;
//       genbox.value = snapshot.val().Gender;
//     }
//     else{
//       alert("No existen esos datos")
//     }
//   })
//   .catch((error)=>{
//     alert("Fallo al seleccionar los datos, error " + error)
//   })
// }

// //Actualizar datos

// function UpdateData() {
//   update(ref(db, "TheUsers/" + idbox.value),{
//     Id: idbox.value,
//     Name: namebox.value,
//     LastName: lastNamebox.value,
//     Age: agebox.value,
//     Gender: genbox.value
//   })
//     .then(()=>{
//       alert("datos actualizados exitosamente");
//     })
//     .catch((error)=>{
//       alert("Fallo al actualizar, error ", error)
//     })
// }

//   //Borrar registros

// function DeleteData() {
//   remove(ref(db, "TheUsers/" + idbox.value))
//   .then(()=>{
//     alert("datos eliminados exitosamente");
//   })
//   .catch((error)=>{
//     alert("Fallo al eliminar, error ", error)
//   })
// }
// //Eventos por boton
// insBtn.addEventListener('click', InsertData)
// selBtn.addEventListener('click', SelectData)
// updBtn.addEventListener('click', UpdateData)
// delBtn.addEventListener('click', DeleteData)