const firebaseConfig = {
    /*apiKey: "AIzaSyBFyQXP99eBMj0sQuABfcr7sHQn51ywE7U",
    authDomain: "arkitask2.firebaseapp.com",*/
    databaseURL: "https://arkitask2-default-rtdb.firebaseio.com",
    /*projectId: "arkitask2",
    storageBucket: "arkitask2.appspot.com",
    messagingSenderId: "558206073756",
    appId: "1:558206073756:web:aa50c3e2f4d341fbcde659",
    measurementId: "G-1KM9F1VB5F"*/
  };

  firebase.initializeApp(firebaseConfig);

//REGISTRAR ASISTENCIA <----
//Elementos para Asistencia
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

//REGISTRAR GRUPO DE PROYECTO <----
//Elementos para Grupo de Proyecto
const openModalGroup = document.getElementById('openGroup');
const modalGroup = document.getElementById('modalGroup');
const closeModalGroup = document.getElementById('closeGroupModal');

const groupForm = document.getElementById('group-form');
const groupRef = firebase.database().ref('GruposProyectos');
const groupTable = document.getElementById('groupTable');


const showGroupModal = () => {
    modalGroup.classList.toggle('is-active')
}

openModalGroup.addEventListener('click', (showGroupModal))
closeModalGroup.addEventListener('click', (showGroupModal))

window.addEventListener('DOMContentLoaded', async (d) => {
    await groupRef.on('value', (groups) => {
        groups.forEach(group => {
            const groupData = group.val()
            groupTable.innerHTML += `<tr>
            <td>${groupData.UidGroup}</td>
            <td>${groupData.FechaIniGroup}</td>
            <td>${groupData.FechaDesGroup}</td>
            <td>${groupData.CantidadGroup}</td>
          </tr>
            `
        });
    })
})

groupForm.addEventListener('submit', (d) => {
    d.preventDefault()
    
    const fechaIniGroup = groupForm['fechaIniGroup'].value
    const fechaDesGroup = groupForm['fechaDesGroup'].value
    const canGroup = groupForm['canGroup'].value

    const registerGroup = groupRef.push()
    registerGroup.set({
        UidGroup: registerGroup._delegate._path.pieces_[1],
        FechaIniGroup: fechaIniGroup,
        FechaDesGroup: fechaDesGroup,
        CantidadGroup: canGroup,
    })
    showGroupModal()
});

// REGISTRAR ENTREGABLES <----
//Elementos para Entregables
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

// OBSERVAR PROYECTOS <----
//Elementos para mostrar los proyectos
const proyectRef = firebase.database().ref('Proyectos');
const proyectsTable = document.getElementById('proyectTable');

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
          </tr>
            `
        });
    })
})
