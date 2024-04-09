var data = JSON.parse(localStorage.getItem("seleccionados"));
var data2 = JSON.parse(localStorage.getItem("seleccionados"));
let datos2 = toString(localStorage.getItem("cantidad"));
let limpiar = document.getElementById("limpiar");
var contenedor1 = document.createElement("div");
document.body.appendChild(contenedor1);
let cont=0;
var productosCache = localStorage.getItem('productosCache');
var carritoContainer = document.getElementById("carrito");
let pago = document.getElementById("pago")

//*******************variables par registro de pago
const btnRegistro = document.getElementById('procesar-pago');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputTarjeta = document.getElementById('tarjeta');
const inputVencimiento = document.getElementById('vencimiento');
const inputCVV = document.getElementById('cvv');
const procesarpago =document.getElementById("procesar-pago"); 
const pickup  = document.getElementById("pickup");
const delivery  = document.getElementById("delivery");
//*******************/


const botonVaciar =document.getElementById("boton-vaciar");
const botonComprar=document.getElementById("boton-comprar");
const elementoCarrito = document.getElementById("elementoCarrito");
const total = document.getElementById('total');
const API = `productos.json`;
let seleccionados =[];
let stockOriginal = [];
let productos = [];

document.addEventListener('DOMContentLoaded', function() {
  // Verificar si existe el array de objetos 'productos' en el localStorage
  const productosLocalStorage = localStorage.getItem('productos');
  if (productosLocalStorage !== null) {
    renderizarPaginaProductos();
  } else {
    // Si no existe, obtener los datos de la API y luego mostrar los productos
    console.log("no existe");
    cargarProductos();
  };
});

function cargarProductos() {
  fetch(API)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        // Agregar productos al array 'productos'
        data.forEach((producto) => {
          productos.push(producto);
        });
        // Mostrar productos en el DOM
        mostrarProductos(data);
       // Verificar y actualizar stock desde el localStorage
        //actualizarStockDesdeLocalStorage();
      })
      .catch((error) => {
        console.log("Hubo un error:", error);
      });
};

function mostrarProductos(productos) {
  productos.forEach((producto) => {
    document.getElementById("contenedorProductos").innerHTML += `
      <div id="productos" class="productos">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-[500px] h-[300px] rounded"/>
        <p><b><u></u></b> ${producto.nombre}</p>
        <p><b><u></u></b> ${producto.descripcion}</p>
        <p><b><u>Ref:</u></b> ${producto.precio}</p>
        <p id="cantidadProducto_${productos.indexOf(producto)}" ><b><u>Cantidad:</u></b> ${producto.stock}</p>
        <button id= "boton" onclick="seleccion(${productos.indexOf(producto)})">Agregar a la parrillera</button>
      </div>`;
  });
hacerCopiaStockOriginal();
};

function renderizarPaginaProductos() {
  // Obtener los datos actualizados del array de productos del localStorage
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  // Seleccionar el contenedor donde se renderizarán los productos
  const contenedorProductos = document.getElementById('contenedorProductos');
  // Limpiar el contenido actual del contenedor
  contenedorProductos.innerHTML = '';
  // Generar el HTML para mostrar los productos con los nuevos valores de stock
  productos.forEach(producto => {
    document.getElementById("contenedorProductos").innerHTML += `
      <div id="productos" class="productos">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-[500px] h-[300px] rounded"/>
        <p><b><u></u></b> ${producto.nombre}</p>
        <p><b><u></u></b> ${producto.descripcion}</p>
        <p><b><u>Ref:</u></b> ${producto.precio}</p>
        <p id="cantidadProducto_${productos.indexOf(producto)}" ><b><u>Cantidad:</u></b> ${producto.stock}</p>
        <button id= "boton" onclick="seleccion(${productos.indexOf(producto)})">Agregar a la parrillera</button>
      </div>`;
  });
};

function seleccion(index) {
  abrirVentanaFlotante();
  console.log("Índice recibido:", index);
  // Verificar si el índice está dentro del rango del array
  //const productosLocalStorage = localStorage.getItem('productos');
  //const productos = productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
  if (index >= 0 && index < productos.length) {
    // Obtener el producto correspondiente al índice
    var productoSeleccionado = productos[index];

    const cantidadProductoElement = document.getElementById(`cantidadProducto_${index}`);
    let cantidadProducto = cantidadProductoElement.innerHTML;
    console.log("stock",cantidadProducto);
    //************************************** */
      // Verificar si hay suficiente stock del producto seleccionado
      if (productoSeleccionado.stock > 0) {
      // Rebajar el stock del producto seleccionado
      //hacerCopiaStockOriginal();
      productoSeleccionado.stock-- ;
      //******************
      //Actualizar el contenido del elemento <p> con la nueva cantidad
      //cantidadProductoElement.innerText =   existencia;
      //***************** */  
      // Verificar si el producto ya está en el array 'seleccionados'
      var indiceExistente = seleccionados.findIndex(function(prod) {
        return prod.nombre === productoSeleccionado.nombre;
      });
      // Si el producto ya está en el array 'seleccionados', aumentar su contador
      if (indiceExistente !== -1) {
        seleccionados[indiceExistente].contador++;
      } else {
        // Si el producto no está en el array 'seleccionados', agregarlo con contador inicializado a 1
        //seleccionados.push({ nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, contador: 1 });
        // Si el producto no está en el array 'seleccionados', agregarlo con contador inicializado a 1
         const fechaCompra = new Date(); // Obtener la fecha actual
         seleccionados.push({ 
           nombre: productoSeleccionado.nombre, 
           precio: productoSeleccionado.precio, 
           contador: 1, 
           fechaCompra: fechaCompra.toLocaleDateString() // Convertir la fecha a una cadena legible
         });
      };
      // Actualizar el carrito en el DOM
      actualizarCarrito();
      //mostrarCarrito();
      // Guardar el array de productos seleccionados 'seleccionados' en el localStorage
      localStorage.setItem('productosSeleccionados', JSON.stringify(seleccionados));
      // Actualizar el stock en el localStorage
      localStorage.setItem('productos', JSON.stringify(productos));
      //actualizarStockDesdeLocalStorage();
    } else {
      alert("¡Lo sentimos, ya  se agoto el producto seleccionado.");
    };
   } else {
    console.log("Índice fuera de rango.",productoSeleccionado);
  };
  console.log(seleccionados);
};


function actualizarStockDesdeLocalStorage() {
  var productosGuardados = localStorage.getItem('productos');
  if (productosGuardados) {
    var productosLocalStorage = JSON.parse(productosGuardados);
    productosLocalStorage.forEach((productoLS, index) => {
      if (productos[index].stock !== productoLS.stock) {
        productos[index].stock = productoLS.stock;
      }
    });
  };
};


function actualizarCarrito() {
  // Limpiar el contenedor del carrito antes de actualizarlo
  carritoContainer.innerHTML = "";
  // Recorrer el array 'seleccionados' y mostrar los productos en el carrito
  //carrito.forEach(function(producto) {
  seleccionados.forEach(function(producto) {
    var productoDiv = document.createElement("div");
    productoDiv.textContent = producto.contador + " - " + producto.nombre + " - $" + producto.precio  * producto.contador;
    carritoContainer.appendChild(productoDiv);
    console.log("ContadorProduicto",producto.contador);
  });
  totalizarCompra();
  rebajarStock();
};

window.onload = function() {
  cargarProductos();
  cerrarVentanaFlotante();
  //actualizarCarrito();
  //mostrarCarrito();
};

/********Vaciar LocalStorage**************** */
botonVaciar.addEventListener('click', () => {
  vaciarCarrito();
});

botonComprar.addEventListener('click', () => {
 
  verificarUsuario();
})

function mostrarElementosCompra(){
  pago.classList.remove('oculto');
  pago.classList.add('visible');
};

limpiar.addEventListener('click', ()=> {
  document.getElementById("carrito").innerText=""; 
  localStorage.clear();
  vaciarCarrito();    
});

function clear() {
  localStorage.clear();
  location.reload();
  document.getElementById("constante").innerText=""; 
  cont=0;         
};

//vaciar la parrillera
function vaciarCarrito() {
// Obtener el array de objetos "productosoriginales" del local storage
//restablecerStockOriginal();


const productosOriginales = JSON.parse(localStorage.getItem('productosOriginales'));
//console.log ("array original", productosOriginales);
localStorage.setItem('productos', JSON.stringify(productosOriginales));
//cargarProductos();
localStorage.removeItem('productosSeleccionados');



// Limpiar el array 'seleccionados'
  carritoContainer.innerHTML = "";
  //productos=[];
  document.getElementById('total').textContent ="";
  //mostrarProductos();
  // cerrarVentanaFlotante();
  restablecerStock();
  renderizarPaginaProductos();
  seleccionados=[];
  pago.classList.remove('visible');
  pago.classList.add('oculto');
};

function restablecerStock() {
  // Obtener la copia del stock original del localStorage
const stockOriginal = JSON.parse(localStorage.getItem('productosOriginales'));
  // Verificar si se encontró la copia del stock original
if (stockOriginal) {
    // Restablecer el stock de cada producto a sus valores originales
    stockOriginal.forEach(producto => {
      // Encuentra el producto correspondiente en el array de productos y restablece su stock
      const productoExistente = productos.find(p => p.id === producto.id);
      if (productoExistente) {
        productoExistente.stock = producto.stock;
      };
    });
    // Actualizar el localStorage con el stock restablecido
    localStorage.setItem('productos', JSON.stringify(productos));
    console.log('El stock de los productos ha sido restablecido.');
  } else {
    console.error('No se encontró una copia del stock original en el localStorage.');
  };
};

function totalizarCompra() {
  // Inicializar el monto total en 0
  var total = 0;
  // Recorrer el array de productos seleccionados y sumar los precios
  seleccionados.forEach(function(producto) {
    total += producto.precio * producto.contador;
  });
  // Mostrar el monto total en el elemento con el id 'total'
  document.getElementById('total').textContent = total.toFixed(2); // Formateamos el total a dos decimales
};

function rebajarStock() {
  // Recorrer el array de productos seleccionados
  seleccionados.forEach(function(productoSeleccionado) {
    // Encontrar el producto correspondiente en el array de productos
    var producto = productos.find(function(prod) {
      return prod.nombre === productoSeleccionado.nombre;
    });
    // Verificar si se encontró el producto
    if (producto) {
      // Verificar si hay suficiente stock para rebajar
      if (producto.stock >= productoSeleccionado.contador) {
        console.log(`Se rebajaron ${productoSeleccionado.contador} unidades del producto ${producto.nombre}.`);
      } else {
        console.log(`No hay suficiente stock del producto ${producto.nombre}.`);
      };
      const cantidadProductoElement = document.getElementById(`cantidadProducto_${productos.indexOf(producto)}`);
      let cantidadProducto = cantidadProductoElement.innerHTML;
      cantidadProducto = `<b><u>Cantidad:</u></b>${producto.stock}`;
      cantidadProductoElement.innerHTML = cantidadProducto;
      } else {
      console.log(`El producto ${productoSeleccionado.nombre} no se encontró.`);
    };
  });
};

// Función para hacer una copia del stock original de los productos
function hacerCopiaStockOriginal() {
  stockOriginal = productos.map(function(producto) {
    return {id: producto.id, imagen: producto.imagen, nombre: producto.nombre, imagen: producto.imagen, precio: producto.precio,stock: producto.stock };
  });
  localStorage.setItem('productosOriginales', JSON.stringify(stockOriginal));
}

// Función para restablecer el stock original si la compra es cancelada
function restablecerStockOriginal() {
const productosOriginales = JSON.parse(localStorage.getItem('productosOriginales'));
// Verificar si productosOriginales es válido
if (productosOriginales && Array.isArray(productosOriginales)) {
    // Restablecer el array de productos a partir de productosOriginales
    localStorage.setItem('productos', JSON.stringify(productosOriginales));
    console.log('El array de productos ha sido restablecido correctamente.');
  } else {
    console.error('No se pudo restablecer el array de productos. El array productosOriginales no es válido.');
  };
};

function comprar() {
  

  verificarUsuario(); 
};

// Función para cancelar la compra
function cancelarCompra() {
  // Restablecer el stock original
  restablecerStockOriginal();
};

/********************************************************** */

const botonAbrir = document.getElementById('abrir');
botonAbrir.addEventListener('click', abrirVentanaFlotante);
function abrirVentanaFlotante() {
  const ventanaFlotante = document.getElementById('ventana-flotante');
  ventanaFlotante.classList.remove('oculto'); // Muestra la ventana flotante
  ventanaFlotante.classList.add('viible');
};



const botonCerrar = document.getElementById('cerrar');
botonCerrar.addEventListener('click', cerrarVentanaFlotante);
function cerrarVentanaFlotante() {
  const ventanaFlotante = document.getElementById('ventana-flotante');
  ventanaFlotante.classList.remove('visible');
  ventanaFlotante.classList.add('oculto'); // Oculta la ventana flotante
  carritoContainer.innerHTML = "";
  //seleccionados=[];
  //productos=[];
  document.getElementById('total').textContent ="";
  renderizarPaginaProductos();
  vaciarCarrito();
};
/***************************************************************** */


// Función para renderizar la página de productos con los nuevos datos del localStorage

//Funcion para verificar usuario registrado

function verificarUsuario() {
  // Verificar si la clave 'usuario' está definida en el localStorage
  const productosSeleccionadosLocalStorage = localStorage.getItem('productosSeleccionados');
    const productosSeleccionados = JSON.parse(productosSeleccionadosLocalStorage);
  if (localStorage.getItem('usuarioNombre1')) {
    // Si el usuario está almacenado, redirigir a la página de sesión
    
    if (productosSeleccionadosLocalStorage) {
        // El array de productos seleccionados existe en el localStorage
        
        const usuario = localStorage.getItem('usuarioNombre1');
        if (usuario ==="gladys") {
          const tituloprocedimientopagoElemento = document.getElementById('titulo-procedimiento-pago');
          let saludoUsuario = tituloprocedimientopagoElemento.innerHTML;
          saludoUsuario = `<div><span>¡Hola, ${usuario}!</span></div>`;
          tituloprocedimientopagoElemento.innerHTML = saludoUsuario;
          //tituloprocedimientopago.innerText=`${usuario}`;
          //alert(`Hola ${usuario}, Continua con tu compra y ¡Buen provecho!`);
          mostrarElementosCompra()  
        }else{
          alert("Para disfrutar de nuestras promociones, te invitamos a que te suscribas antes de comprar, y si ya estas suscrit@, solamente inicia sesion y ¡listo! ");
          //window.location.href = 'registro.html';
        };
        //console.log(productosSeleccionados);
        
    } else {
        // El array de productos seleccionados no existe en el localStorage
        //console.log('No se encontraron productos seleccionados en el localStorage');
        alert(`¡No has seleccionado ninguno de nuestros platos!`);
        
    };

    //window.location.href = 'sesion.html';
  } else {
    // Si no hay usuario almacenado, redirigir a la página de registro
    alert("Para disfrutar de nuestras promociones, te invitamos a que te suscribas antes de comprar");
    window.location.href = 'registro.html';
  };
};

//*********************************************** 
 // Selecciona el elemento de la ventana flotante
var ventanaFlotante = document.getElementById('ventana-flotante');

// Variables para guardar la posición inicial del mouse y de la ventana flotante
var offsetX, offsetY;

// Función para manejar el inicio del arrastre
function iniciarArrastre(evento) {
  // Guarda la posición inicial del mouse
  offsetX = evento.clientX - ventanaFlotante.getBoundingClientRect().left;
  offsetY = evento.clientY - ventanaFlotante.getBoundingClientRect().top;

  // Agrega un evento para seguir el movimiento del mouse
  document.addEventListener('mousemove', arrastrar);

  // Agrega un evento para terminar el arrastre
  document.addEventListener('mouseup', terminarArrastre);
}

// Función para manejar el arrastre
function arrastrar(evento) {
  // Calcula la nueva posición de la ventana flotante
  var posX = evento.clientX - offsetX;
  var posY = evento.clientY - offsetY;

  // Aplica la nueva posición a la ventana flotante
  ventanaFlotante.style.left = posX + 'px';
  ventanaFlotante.style.top = posY + 'px';
}

// Función para manejar el final del arrastre
function terminarArrastre(evento) {
  // Remueve los eventos de arrastre
  document.removeEventListener('mousemove', arrastrar);
  document.removeEventListener('mouseup', terminarArrastre);
}

// Agrega un evento para iniciar el arrastre cuando se hace clic en la ventana flotante
ventanaFlotante.addEventListener('mousedown', iniciarArrastre);

//************************funciones registro pago */
//inputNombre.focus();
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


function validarApellido(apellido){
  const regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]{2,}(?:\s[A-Za-zÑñÁáÉéÍíÓóÚú]{2,})*)$/;
    const coincide = regex.test(apellido);
    
    if(coincide){
        document.getElementById('apellido').classList.remove('border-rose-500', 'border-2');
        document.getElementById('apellido').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('apellido').classList.remove('border-green-500', 'border-2');
        document.getElementById('apellido').classList.add('border-rose-500', 'border-2');
    };
}

function validarTarjeta(tarjeta){
  // Actualizar esta regex y adaptarla a el proposito indicado.
  const regex = /^\d{16}$/;
  const coincide = regex.test(tarjeta);
  
  if(coincide){
      document.getElementById('tarjeta').classList.remove('border-rose-500', 'border-2');
      document.getElementById('tarjeta').classList.add('border-green-500', 'border-2');
  }else{
      document.getElementById('tarjeta').classList.remove('border-green-500', 'border-2');
      document.getElementById('tarjeta').classList.add('border-rose-500', 'border-2');
  };
}

function validarVencimiento(vencimiento){
    //const regex = /^(19[0-9]{2}|20[0-2]{1}|202[0-4])-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/
    const regex = /^(202[0-4]|[0-1][0-9]{2}|[0-9]{1,2})-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/;
    const coincide = regex.test(vencimiento);
    
    if(coincide){
        document.getElementById('vencimiento').classList.remove('border-rose-500', 'border-2');
        document.getElementById('vencimiento').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('fechavencimiento').classList.remove('border-green-500', 'border-2');
        document.getElementById('fechavencimiento').classList.add('border-rose-500', 'border-2');
    };
}

function validarCVV(cvv){
    const regex = /^[0-9]{3}$/;
    //const regex = /^(202[0-4]|[0-1][0-9]{2}|[0-9]{1,2})-(0[1-9]|1[0-2]| [1-2]?[0-9]|3[0-1])-(0[1-9]|[1-2]?[0-9]|3[0-1])$/
    const coincide = regex.test(cvv);
    
    if(coincide){
        document.getElementById('cvv').classList.remove('border-rose-500', 'border-2');
        document.getElementById('cvv').classList.add('border-green-500', 'border-2');
    }else{
        document.getElementById('cvv').classList.remove('border-green-500', 'border-2');
        document.getElementById('cvv').classList.add('border-rose-500', 'border-2');
    };
}


// Asignando eventos a los campos del formulario
inputNombre.addEventListener('keyup', (e) => {
    // validarNombre(evento.objetivo.valor);
    validarNombre(e.target.value);
    
});

inputApellido.addEventListener('keyup', (e) => {
    validarApellido(e.target.value);
});

inputTarjeta.addEventListener('change', (e) => {
    validarTarjeta(e.target.value);
});

inputVencimiento.addEventListener('keyup', (e) => {
    validarVencimiento(e.target.value);
});

inputCVV.addEventListener('keyup', (e) => {
    validarCVV(e.target.value);
});

//let contpago= 0;


pickup.addEventListener('change', function() {
  // Si pickupCheckbox está marcado, deshabilitar deliveryCheckbox
  if (pickup.checked) {
      delivery.disabled = true;
  } else {
      // Si pickupCheckbox está desmarcado, habilitar deliveryCheckbox
      delivery.disabled = false;
  }
});

// Agregar listener de evento de cambio a deliveryCheckbox
delivery.addEventListener('change', function() {
  // Si deliveryCheckbox está marcado, deshabilitar pickupCheckbox
  if (delivery.checked) {
      pickup.disabled = true;
  } else {
      // Si deliveryCheckbox está desmarcado, habilitar pickupCheckbox
      pickup.disabled = false;
  }
});

procesarpago.addEventListener('click', (e) => {
  // Obtener referencias a los checkboxes y a los campos de entrada
  const pickupCheckbox = document.getElementById('pickup');
  const deliveryCheckbox = document.getElementById('delivery');
  const inputNombre = document.getElementById('nombre');
  const inputApellido = document.getElementById('apellido');
  const inputTarjeta = document.getElementById('tarjeta');
  const inputVencimiento = document.getElementById('vencimiento');
  const inputCVV = document.getElementById('cvv');
  const usuario = localStorage.getItem('usuarioNombre1');
  // Verificar si los datos del formulario son correctos
  if (inputNombre.classList.contains('border-rose-500') || inputApellido.classList.contains('border-rose-500') || inputTarjeta.classList.contains('border-rose-500') || inputVencimiento.classList.contains('border-rose-500') || inputCVV.classList.contains('border-rose-500') || inputNombre.value=="" || inputApellido.value=="" || inputTarjeta.value == "" || inputVencimiento.value=="" || inputCVV.value=="") {
      // Mostrar mensaje de error si hay campos incorrectos o vacíos
      alert(`- No se ha ingresado información del usuario\n- Hay algun valor errado\n- Hay campos vacíos`);
  } else {
      // Verificar qué checkbox está seleccionado y mostrar el mensaje correspondiente
      if (pickupCheckbox.checked) {
          alert(`${usuario} ¡ Tú pago procesado! Has seleccionado PickUP. Puedes retirar tu pedido dentro de 20 min. ¡Gracias por elegirno!`);
      } else if (deliveryCheckbox.checked) {
          alert(`${usuario} ¡ Tú pago procesado! Has seleccionado Delivery. Tu pedido llegara en 20 min. a la dirección indicada en tu porfil. ¡Buenprovecho! y ¡Gracias por elegirnos!`);
      } else {
          // Mostrar mensaje de error si no se ha seleccionado ningún método de entrega
          alert('Por favor selecciona un método de entrega (PickUP o Delivery).');
          return; // Salir de la función si no se seleccionó ningún método de entrega
      }

      // Mostrar mensaje de éxito
      //alert(`Su pago fue procesado con éxito, gracias por su compra y ¡Buen provecho!`);

      // Limpiar campos y clases de borde
      inputNombre.classList.remove('border-green-500');
      inputApellido.classList.remove('border-green-500');
      inputTarjeta.classList.remove('border-green-500');
      inputVencimiento.classList.remove('border-green-500');
      inputCVV.classList.remove('border-green-500');
      inputNombre.value = "";
      inputApellido.value = "";
      inputTarjeta.value = "";
      inputVencimiento.value = "";
      inputCVV.value = "";
      vaciarCarrito();
  }
});//procesarpago.addEventListener('click', (e) => {
//  
//  
//
//  if (inputNombre.classList.contains('border-rose-500') || inputApellido.classList.contains('border-rose-500') || inputTarjeta.classList.contains('border-rose-500') || inputVencimiento.classList.contains('border-rose-500') || inputCVV.classList.contains('border-rose-500') || inputNombre.value=="" || inputApellido.value=="" || inputTarjeta.value == "" || inputVencimiento.value=="" || inputCVV.value=="") {
//      alert(`- No se ha ingresado información del usuario\n- Hay algun valor errado\n- Hay campos vacíos`);
//    } else {
//      // Almacenar el nombre y la clave en el localStorage
//      //localStorage.setItem(`usuarioNombre${cont}`, inputNombre.value);
//      //localStorage.setItem(`usuarioClave${cont}`, inputClave.value);
//      // Crear un párrafo para mostrar los datos registrados
//      //contpago++;  
//      //let parrafo = document.createElement("p");
//      //parrafo.innerHTML = `${inputNombre.value} | ${inputUsuario.value} | ${inputTelefono.value} | ${inputCorreo.value} | ${inputClave.value} `;
//      //seccion2.appendChild(parrafo);
//       
//      // Mostrar mensaje de éxito
//      alert(`Su pago fue procesado con exito, gracias por su compra y ¡Buen provecho!`);
//      //alert(`El usuario ${inputNombre.value} fue registrado exitosamente`);
//  
//      // Limpiar campos y clases de borde
//      inputNombre.classList.remove('border-green-500');
//      inputApellido.classList.remove('border-green-500');
//      inputTarjeta.classList.remove('border-green-500');
//      inputVencimiento.classList.remove('border-green-500');
//      inputCVV.classList.remove('border-green-500');
//      inputNombre.value = "";
//      inputApellido.value = "";
//      inputTarjeta.value = "";
//      inputVencimiento.value = "";
//      inputCVV.value = "";
//    }
//});