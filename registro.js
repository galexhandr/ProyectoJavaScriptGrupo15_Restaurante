// Obtenemos los elementos del formulario
const btnRegistro = document.getElementById('registrar');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputNacimiento = document.getElementById('nacimiento');
const inputUsuario = document.getElementById('usuario');
const inputTelefono = document.getElementById('telefono');
const inputClave = document.getElementById('clave');
const seccion2 = document.getElementById('seccion-2');

// Validamos cada campo del formulario para ello creamos una funcion para cada campo
inputNombre.focus();
// Funciones de validacion
function validarNombre(nombre){
    //const regex = /^[a-zA-ZäëïöüÄËÏÖÜ]{3,20}$/;
    const regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]{2,}(?:\s[A-Za-zÑñÁáÉéÍíÓóÚú]{2,})*)$/;
    ;
    const coincide = regex.test(nombre);
    
    if(coincide){
        document.getElementById('nombre').classList.remove('border-rose-500', 'border-2');
        document.getElementById('nombre').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('nombre').classList.remove('border-green-500', 'border-2');
        document.getElementById('nombre').classList.add('border-rose-500', 'border-2');
    };
}


function validarEmail(email){
    const regex = /^\w{3,20}@[a-zA-Z]{3,15}\.[a-zA-Z]{2,15}$/;
    const coincide = regex.test(email);
    
    if(coincide){
        document.getElementById('correo').classList.remove('border-rose-500', 'border-2');
        document.getElementById('correo').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('correo').classList.remove('border-green-500', 'border-2');
        document.getElementById('correo').classList.add('border-rose-500', 'border-2');
    };
}

function validarNacimiento(fecha){
    const regex = /^(19[0-9]{2}|20[0-2]{1}|202[0-4])-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/
    //const regex = /^(202[0-4]|[0-1][0-9]{2}|[0-9]{1,2})-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/
    const coincide = regex.test(fecha);
    
    if(coincide){
        document.getElementById('nacimiento').classList.remove('border-rose-500', 'border-2');
        document.getElementById('nacimiento').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('nacimiento').classList.remove('border-green-500', 'border-2');
        document.getElementById('nacimiento').classList.add('border-rose-500', 'border-2');
    };
}

function validarUsuario(usuario){
    const regex = /^[a-zA-Z]{8}$/;
    //const regex = /^(202[0-4]|[0-1][0-9]{2}|[0-9]{1,2})-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/
    const coincide = regex.test(usuario);
    
    if(coincide){
        document.getElementById('usuario').classList.remove('border-rose-500', 'border-2');
        document.getElementById('usuario').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('usuario').classList.remove('border-green-500', 'border-2');
        document.getElementById('usuario').classList.add('border-rose-500', 'border-2');
    };
}
function validarTelefono(telefono){
    // Actualizar esta regex y adaptarla a el proposito indicado.
    const regex = /^(\d{3}-\d{3}-\d{2}-\d{2})$/;
    const coincide = regex.test(telefono);
    
    if(coincide){
        document.getElementById('telefono').classList.remove('border-rose-500', 'border-2');
        document.getElementById('telefono').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('telefono').classList.remove('border-green-500', 'border-2');
        document.getElementById('telefono').classList.add('border-rose-500', 'border-2');
    };
}

function validarClave(clave){
    // Actualizar esta regex y adaptarla a el proposito indicado.
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8}$/;
    const coincide = regex.test(clave);
    
    if(coincide){
        document.getElementById('clave').classList.remove('border-rose-500', 'border-2');
        document.getElementById('clave').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('clave').classList.remove('border-green-500', 'border-2');
        document.getElementById('clave').classList.add('border-rose-500', 'border-2');
    };
}



// Asignando eventos a los campos del formulario
inputNombre.addEventListener('keyup', (e) => {
    // validarNombre(evento.objetivo.valor);
    validarNombre(e.target.value);
    
});

inputCorreo.addEventListener('keyup', (e) => {
    validarEmail(e.target.value);
});

inputUsuario.addEventListener('change', (e) => {
    validarUsuario(e.target.value);
});

inputTelefono.addEventListener('keyup', (e) => {
    validarTelefono(e.target.value);
});

inputClave.addEventListener('keyup', (e) => {
    validarClave(e.target.value);
});

let cont= 0;
registrar.addEventListener('click', (e) => {
    
    if (inputNombre.classList.contains('border-rose-500') || inputCorreo.classList.contains('border-rose-500') || inputUsuario.classList.contains('border-rose-500') || inputTelefono.classList.contains('border-rose-500') || inputClave.classList.contains('border-rose-500') || inputNombre.value=="" || inputCorreo.value=="" || inputUsuario.value == "" || inputTelefono.value=="" || inputClave.value=="") {
      alert(`- No se ha ingresado información del usuario\n- Hay algun valor errado\n- Hay campos vacíos`);
    } else {
      // Almacenar el nombre y la clave en el localStorage
      localStorage.setItem(`usuarioNombre${cont}`, inputNombre.value);
      localStorage.setItem(`usuarioClave${cont}`, inputClave.value);
      // Crear un párrafo para mostrar los datos registrados
      cont++;  
      let parrafo = document.createElement("p");
      parrafo.innerHTML = `${inputNombre.value} | ${inputUsuario.value} | ${inputTelefono.value} | ${inputCorreo.value} | ${inputClave.value} `;
      seccion2.appendChild(parrafo);
      
      // Mostrar mensaje de éxito
      alert(`El usuario ${inputNombre.value} fue registrado exitosamente`);
  
      // Limpiar campos y clases de borde
      inputNombre.classList.remove('border-green-500');
      inputUsuario.classList.remove('border-green-500');
      inputCorreo.classList.remove('border-green-500');
      inputTelefono.classList.remove('border-green-500');
      inputClave.classList.remove('border-green-500');
      inputNombre.value = "";
      inputUsuario.value = "";
      inputCorreo.value = "";
      inputTelefono.value = "";
      inputClave.value = "";
    }
});
