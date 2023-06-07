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

const showRegisterModal = () => (
    modal.classList.toggle('is-active')
)

openModal.addEventListener('click', (showRegisterModal))
closeModal.addEventListener('click', (showRegisterModal))


const deleteStudent = (uid) => {
    firebase.database().ref(`Usuarios/${uid}`).remove()
}

const showUpdateModal = () => {
    updateModal.classList.toggle('is-active')
}

closeUpdateModal.addEventListener('click', showUpdateModal)

window.addEventListener('DOMContentLoaded', async (e) => {
    await studentRef.on('value', (students) => {
        studentsTable.innerHTML = ''
        students.forEach((student) =>{
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
                button.addEventListener('click', (e) => {
                    showUpdateModal()
                    firebase.database().ref(`Usuarios/${e.target.dataset.id}`).once('value').then((student) =>{
                        const data = student.val()
                        updateForm['nombre'].value = data.Nombre
                        updateForm['apePri'].value = data.PrimerApe
                        updateForm['apeSeg'].value = data.SegunApe
                        updateForm['cel'].value = data.Telefono
                        updateForm['email'].value = data.Correo
                        updateForm['descrip'].value = data.Descripcion
                    })
                    const uid = e.target.dataset.id
                    updateForm.addEventListener('submit', (e) => {
                        e.preventDefault()

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
                button.addEventListener('click', (e) => {
                    deleteStudent(e.target.dataset.id)
                })
            })
        }) 
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
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
})