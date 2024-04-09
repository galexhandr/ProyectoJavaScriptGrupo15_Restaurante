const mostrarProductos = document.getElementById('mostrarProductos');

mostrarProductos.addEventListener('click', function() {
    // Recuperar el array de objetos del localStorage
    const productosString = localStorage.getItem('productos');

    // Verificar si hay datos en el localStorage
    if (productosString) {
      // Convertir la cadena JSON a un array de objetos
      const productos = JSON.parse(productosString);

      // Obtener el contenedor donde se mostrarán los productos
      const productosContainer = document.getElementById('productosContainer');

      // Limpiar el contenedor antes de agregar nuevos elementos
      productosContainer.innerHTML = '';

      // Recorrer los productos y crear un elemento para cada uno
      productos.forEach(producto => {
        // Crear un div para el producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto' ,'w-full','h-[300px]','flex', 'flex-col', 'items-center' ,'justify-center');

        // Crear y agregar elementos para cada propiedad del producto
        Object.keys(producto).forEach(key => {
          const propiedadDiv = document.createElement('div');
          propiedadDiv.textContent = `${key}: ${producto[key]}`;
          productoDiv.appendChild(propiedadDiv);
        });

        // Agregar el producto al contenedor de productos
        productosContainer.appendChild(productoDiv);
      });
    } else {
      // Mostrar un mensaje si no hay datos en el localStorage
      alert("No hay datos de productos almacenados.");
    }
  });