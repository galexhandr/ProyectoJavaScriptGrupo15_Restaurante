document.getElementById('ingresar').addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
  
    verificarCredenciales(usuario, clave);
  });

function verificarCredenciales(usuario, clave) {
    // Obtener el usuario y la clave almacenados en el localStorage
    const usuarioAlmacenado = localStorage.getItem('usuarioNombre');
    const claveAlmacenada = localStorage.getItem('usuarioAdmin');
  
    // Verificar si el usuario y la clave coinciden con los almacenados
    if (usuario === usuarioAlmacenado && clave === claveAlmacenada) {
      // Redirigir al usuario a la página restringida
      //window.location.href = 'http://127.0.0.1:5500/JavaScript/ProyectoJavaScript/administracion.html';
      window.open('http://127.0.0.1:5500/JavaScript/ProyectoJavaScript/administracion.html', '_blank');
    } else {
      // Mostrar un mensaje de error o realizar otras acciones según sea necesario
      alert('Usuario o clave incorrectos. Inténtelo de nuevo.');
    }
  }