const firebaseConfig = {
    apiKey: "AIzaSyDUXNlRkmHUaElSku5Fr-c4dhezZTMkupA",
    authDomain: "arkitask-ee3f0.firebaseapp.com",
    databaseURL: "https://arkitask-ee3f0-default-rtdb.firebaseio.com",
    projectId: "arkitask-ee3f0",
    storageBucket: "arkitask-ee3f0.appspot.com",
    messagingSenderId: "600440500538",
    appId: "1:600440500538:web:4395adc6f3693d7fffa003",
    measurementId: "G-YSBD66GWVG"
  };

  firebase.initializeApp(firebaseConfig);

// REGISTRAR PROYECTO <----
//Elementos para abrir el boton de registrar usuario
const openModalPro = document.getElementById('openProyect');
const modalPro = document.getElementById('modalProyect');
const closeModalPro = document.getElementById('closeProyectModal');

const proyectForm = document.getElementById('proyect-form');
const proyectRef = firebase.database().ref('Proyectos');
const proyectsTable = document.getElementById('proyectTable');


const showProyectModal = () => {
    modalPro.classList.toggle('is-active')
}

openModalPro.addEventListener('click', (showProyectModal))
closeModalPro.addEventListener('click', (showProyectModal))

window.addEventListener('DOMContentLoaded', async (b) => {
    await proyectRef.on('value', (proyects) => {
        proyects.forEach(proyect => {
            const proyectData = proyect.val()
            proyectsTable.innerHTML += `<tr>
            <td>${proyectData.NombrePro}</td>
            <td>${proyectData.UidPro}</td>
            <td>${proyectData.FechaEntregaPro}</td>
            <td>${proyectData.FechaRealizacionPro}</td>
            <td>${proyectData.EstadoPro}</td>
            <td>
                <img src="${proyectData.Imagen}" class="imagenes">
            </td>
          </tr>
            `
            console.log(proyectData);
        });
    })
})

proyectForm.addEventListener('submit', (b) => {
    b.preventDefault()
    
    const nombrePro = proyectForm['nombrePro'].value
    const fechEntrPro = proyectForm['fechEntrPro'].value
    const fechReaPro = proyectForm['fechReaPro'].value
    const estaPro = proyectForm['estaPro'].value

    const registerProyect = proyectRef.push()
    registerProyect.set({
        UidPro: registerProyect._delegate._path.pieces_[1],
        NombrePro: nombrePro,
        FechaEntregaPro: fechEntrPro,
        FechaRealizacionPro: fechReaPro,
        EstadoPro: estaPro,
    })

    let fileInput = proyectForm.querySelector("#file");

    let file = fileInput.files[0];

    publish({ file });

  

  queryImages();
    showProyectModal()
});


const addDoc = async({ collection, data }) =>{
    let document = {
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
  
    // 1. Una colección
    let collectionRef = firebase.firestore().collection(collection);
  
    // 2. Guardar el documento
  
    return collectionRef.add(document);
  }
  
  // upload({ file:  })
  const upload = async ({ file }) => {
    // 1. Referencia al espacio en el bucket donde estará el archivo
    let storageRef = firebase.storage().ref().child(`images/${file.name}`);
    // 2 Subir el archivo
    await storageRef.put(file);
    // 3. Retornar la referencia
  
    return storageRef;
  }
  
  
  const publish = async ({ file }) => {
    let storageRef = await upload({file});
    return addDoc({ collection: 'files', data: { path: storageRef.fullPath } })
  }
  
  const queryImages = async () => {
    // 1. Colección
    let collection = firebase.firestore().collection('files')
                      .orderBy('createdAt','desc');
    // 2. onSnapshot a cambios en los documentos
    collection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if(change.type === "added"){
          showImage(change.doc.data());
        }
      });
    });
  }
  
  const showImage = async (docData)=>{
    let node = document.createElement("div");
    node.classList.add("item");
    let url = await firebase.storage().ref(docData.path).getDownloadURL();
    // node.innerHTML = `
    //   <img class='image' src='${url}' />
    // `;
  console.log(firebase.storage());
    let container = document.querySelector("#images");
    container.append(node);
  
    //Descargar archivo
    
  }
  




//REGISTRAR ASISTENCIA <----
const openModalAsis = document.getElementById('openAsistencia');
const modalAsis = document.getElementById('modalAsistencia');
const closeModalAsis = document.getElementById('closeAsistenciaModal');

const asistenciaForm = document.getElementById('asistencia-form');
const asistenciaRef = firebase.database().ref('Asistencia');
const asistenciaTable = document.getElementById('asistenciaTable');


const showAsistenciaModal = () => {
    modalAsis.classList.toggle('is-active')
}

openModalAsis.addEventListener('click', (showAsistenciaModal))
closeModalAsis.addEventListener('click', (showAsistenciaModal))

window.addEventListener('DOMContentLoaded', async (c) => {
    await asistenciaRef.on('value', (asistencias) => {
        asistencias.forEach(asistencia => {
            const asistenciaData = asistencia.val()
            asistenciaTable.innerHTML += `<tr>
            <td>${asistenciaData.NombreAsis}</td>
            <td>${asistenciaData.FechaIngresoAsis}</td>
            <td>${asistenciaData.HoraIngresoAsis}</td>
            <td>${asistenciaData.FechaSalidaAsis}</td>
            <td>${asistenciaData.HoraSalidaAsis}</td>
          </tr>
            `
        });
    })
})

asistenciaForm.addEventListener('submit', (c) => {
    c.preventDefault()
    
    const nombreAsis = asistenciaForm['nombreAsis'].value
    const fechaIngAsis = asistenciaForm['fechaIngAsis'].value
    const horaIngAsis = asistenciaForm['horaIngAsis'].value
    const fechaSalAsis = asistenciaForm['fechaSalAsis'].value
    const horaSalAsis = asistenciaForm['horaSalAsis'].value

    const registerAsistencia = asistenciaRef.push()
    registerAsistencia.set({
        UidAsis: registerAsistencia._delegate._path.pieces_[1],
        NombreAsis: nombreAsis,
        FechaIngresoAsis: fechaIngAsis,
        HoraIngresoAsis: horaIngAsis,
        FechaSalidaAsis: fechaSalAsis,
        HoraSalidaAsis: horaSalAsis,
    })
    showAsistenciaModal()
});

// REGISTRAR ENTREGABLES <----
const openModalEntre = document.getElementById('openEntre');
const modalEntre = document.getElementById('modalEntre');
const closeModalEntre = document.getElementById('closeEntreModal');

const entregableForm = document.getElementById('entregable-form');
const entregableRef = firebase.database().ref('Entregables');
const entregablesTable = document.getElementById('entregablesTable');


const showEntregableModal = () => {
    modalEntre.classList.toggle('is-active')
}

openModalEntre.addEventListener('click', (showEntregableModal))
closeModalEntre.addEventListener('click', (showEntregableModal))

window.addEventListener('DOMContentLoaded', async (f) => {
    await entregableRef.on('value', (entregables) => {
        entregables.forEach(entregable => {
            const entregableData = entregable.val()
            entregablesTable.innerHTML += `<tr>
            <td>${entregableData.NombreEntre}</td>
            <td>${entregableData.FechaEntre}</td>
            <td>${entregableData.DescripcionEntre}</td>
            <td>${entregableData.ImagenEntre}</td>
            <td>${entregableData.ComenEntre}</td>
            <td>${entregableData.EstadoEntre}</td>
          </tr>
            `
        });
    })
})

entregableForm.addEventListener('submit', (f) => {
    f.preventDefault()
    
    const nombreEntre = entregableForm['nombreEntre'].value
    const fechaEntre = entregableForm['fechaEntre'].value
    const descripEntre = entregableForm['descripEntre'].value
    const imagenEntre = entregableForm['imagenEntre'].value
    const comenEntre = entregableForm['comenEntre'].value
    const estadoEntre = entregableForm['estadoEntre'].value

    const registerEntre = entregableRef.push()
    registerEntre.set({
        UidEntre: registerEntre._delegate._path.pieces_[1],
        NombreEntre: nombreEntre,
        FechaEntre: fechaEntre,
        DescripcionEntre: descripEntre,
        ImagenEntre: imagenEntre,
        ComenEntre: comenEntre,
        EstadoEntre: estadoEntre,
    })
    showEntregableModal()
});