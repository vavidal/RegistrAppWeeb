// function generarCodigoQR() {
//     // Redirige a la página que muestra el código QR
//     window.location.href = "generar-codigo-qr.html";
// }
// Función para mostrar el modal
// Función para mostrar el modal

var nombre = localStorage.getItem('nombre');
var carrera = localStorage.getItem('carrera');
var email = localStorage.getItem('email');

document.getElementById("nombreProfesor").textContent = nombre;
document.getElementById("nombreCarrera").textContent = carrera;
document.getElementById("emailProfesor").textContent = email;

function openQRModal() {   
    
    // Extraer siglas de asignatura
    const codigo = localStorage.getItem('materia');

    //URL personalizada;
    const url = `http://localhost:3000/asistencia/${codigo}`; 
   
    const modal = document.getElementById("qrModal");
    modal.style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Extraer materia + asistencia 
            const materia = data.materia;
            const asistencia = data.clases;
            // Concatenar datos
            const dataMateria = { materia, asistencia };

            //Mostraer el QR con los datos
            const qr = new QRious({
                element: document.getElementById("qr-canvas"),
                value: JSON.stringify(dataMateria)
            });
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error);
        });

}



// Resto del código (asociar eventos y cerrar modal) sigue igual


// Función para cerrar el modal
function closeQRModal() {
    const modal = document.getElementById("qrModal");
    modal.style.display = "none";
}

// Asocia las funciones a los botones
document.getElementById("showQRButton").addEventListener("click", openQRModal);
document.getElementById("closeQR").addEventListener("click", closeQRModal);

// Cierra el modal si el usuario hace clic fuera del contenido
window.addEventListener("click", (event) => {
    const modal = document.getElementById("qrModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function cerrarSesionBtn(){
    localStorage.clear();
    alert("Sesión cerrada");
    window.location.href = 'login.html';
  }

function irAInicioSesion() {
    window.location.href = 'login.html';
}