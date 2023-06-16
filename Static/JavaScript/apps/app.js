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
// REGISTRAR USUARIO <----
//Elementos para abrir el boton de registrar usuario
const openModal = document.getElementById('openRegister');
const modal = document.getElementById('modal');

const updateModal = document.getElementById('modal-update')
const updateForm = document.getElementById('update-form');
const closeUpdateModal = document.getElementById('closeUpdateModal')

const closeModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('register-form');
const studentRef = firebase.database().ref('Usuarios');
const studentData = document.getElementById('studentsTable');


const showRegisterModal = () => {
    modal.classList.toggle('is-active')
}

openModal.addEventListener('click', (showRegisterModal))
closeModal.addEventListener('click', (showRegisterModal))


const deleteStudent = (uid) => {
    firebase.database().ref(`Usuarios/${uid}`).remove()
}

const showUpdateModal = () => {
    updateModal.classList.toggle('is-active')
}

closeUpdateModal.addEventListener('click', showUpdateModal)

window.addEventListener('DOMContentLoaded', async (a) => {
    await studentRef.on('value', (users) => {
        studentsTable.innerHTML = ''
        users.forEach((student) =>{
            let studentData = student.val()
            studentsTable.innerHTML += `
            <tr>
                <td>${studentData.Nombre}</td>
                <td>${studentData.PrimerApe}</td>
                <td>${studentData.SegunApe}</td>
                <td>${studentData.Telefono}</td>
                <td>${studentData.Correo}</td>
                <td>
                    <button class="button is-warning" data-id="${studentData.Uid}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="button is-danger" data-id="${studentData.Uid}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
            `
            const updateButtons = document.querySelectorAll('.is-warning')
            updateButtons.forEach((button) => {
                button.addEventListener('click', (a) => {
                    showUpdateModal()
                    firebase.database().ref(`Usuarios/${a.target.dataset.id}`).once('value').then((student) =>{
                        const data = student.val()
                        updateForm['nombre'].value = data.Nombre
                        updateForm['apePri'].value = data.PrimerApe
                        updateForm['apeSeg'].value = data.SegunApe
                        updateForm['cel'].value = data.Telefono
                        updateForm['email'].value = data.Correo
                        updateForm['descrip'].value = data.Descripcion
                    })
                    const uid = a.target.dataset.id
                    updateForm.addEventListener('submit', (a) => {
                        a.preventDefault()

                        const nombre = updateForm['nombre'].value
                        const apellidoPri = updateForm['apePri'].value
                        const apellidoSeg = updateForm['apeSeg'].value
                        const telefono = updateForm['cel'].value
                        const correo = updateForm['email'].value
                        const descripcion = updateForm['descrip'].value

                        firebase.database().ref(`Usuarios/${uid}`).update({
                            Nombre: nombre,
                            PrimerApe: apellidoPri,
                            SegunApe: apellidoSeg,
                            Telefono: telefono,
                            Correo: correo,
                            Descripcion: descripcion,
                        })
                        showUpdateModal()
                    })
                })
            })

            const deleteButtons = document.querySelectorAll('.is-danger')
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (a) => {
                    deleteStudent(a.target.dataset.id)
                })
            })
        }) 
    })
})

registerForm.addEventListener('submit', (a) => {
    a.preventDefault()
    
    const nombre = registerForm['nombre'].value
    const apellidoPri = registerForm['apePri'].value
    const apellidoSeg = registerForm['apeSeg'].value
    const telefono = registerForm['cel'].value
    const correo = registerForm['email'].value
    const descripcion = registerForm['descrip'].value

    const registerStudent = studentRef.push()
    registerStudent.set({
        Uid: registerStudent._delegate._path.pieces_[1],
        Nombre: nombre,
        PrimerApe: apellidoPri,
        SegunApe: apellidoSeg,
        Telefono: telefono,
        Correo: correo,
        Descripcion: descripcion,
    })
    showRegisterModal()
});

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
          </tr>
            `
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
    showProyectModal()
});

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

//REGISTRAR GRUPO DE PROYECTO <----
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
const entregableRef = firebase.database().ref('Entregables');
const entregablesTable = document.getElementById('entregablesTable');

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
