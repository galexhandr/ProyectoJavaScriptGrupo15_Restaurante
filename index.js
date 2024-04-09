document.addEventListener('DOMContentLoaded', function() {
  // Verificar si hay un usuario administrador en el localStorage
  const usuarioAdmin = localStorage.getItem('usuarioAdmin');
  // Obtener el menú
  const menu = document.getElementById('admin');
  // Si hay un usuario administrador, mostrar el menú
  if (usuarioAdmin) {
    menu.classList.remove('oculto');
  }
});

let refresh = document.getElementById("limpiar");
  refresh.addEventListener('click', _ => {
    localStorage.clear();          
    location.reload();
    //document.getElementById("constante").innerText="";
});