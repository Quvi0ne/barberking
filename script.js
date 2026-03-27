const servicios = [
    {
      id: 1,
      nombre: "Corte clásico",
      descripcion: "Corte tradicional con tijera y máquina",
      precio: 45,
      emoji: "✂️",
      imagen: "img/corte-clasico.jpg"
    },
    {
      id: 2,
      nombre: "Corte moderno",
      descripcion: "Estilos actuales y degradados",
      precio: 60,
      emoji: "💈",
      imagen: "img/corte-moderno.jpg"
    },
    {
      id: 3,
      nombre: "Arreglo de barba",
      descripcion: "Perfilado y arreglo completo de barba",
      precio: 35,
      emoji: "🪒",
      imagen: "img/arreglo-barba.jpg"
    },
    {
      id: 4,
      nombre: "Corte + barba",
      descripcion: "Combo completo corte y barba",
      precio: 75,
      emoji: "👑",
      imagen: "img/combo.jpg"
    },
    {
      id: 5,
      nombre: "Tinte",
      descripcion: "Coloración profesional para cabello",
      precio: 120,
      emoji: "🎨",
      imagen: "img/tinte.jpg"
    },
    {
      id: 6,
      nombre: "Cejas",
      descripcion: "Perfilado y arreglo de cejas",
      precio: 25,
      emoji: "✨",
      imagen: "img/cejas.jpg"
    }
  ];
  
  let carrito = [];
  
  function generarTarjetas() {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
  
    servicios.forEach(servicio => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-img-wrapper">
          <img src="${servicio.imagen}" alt="${servicio.nombre}" class="card-img">
        </div>
        <div class="card-body">
          <h3>${servicio.nombre}</h3>
          <p>${servicio.descripcion}</p>
          <span class="card-precio">Q${servicio.precio}</span>
          <button class="btn-agregar" onclick="agregarAlCarrito(${servicio.id})">
            + Agregar
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  
  function agregarAlCarrito(id) {
    const servicio = servicios.find(s => s.id === id);
    const existente = carrito.find(item => item.id === id);
  
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ ...servicio, cantidad: 1 });
    }
  
    actualizarCarrito();
  }
  
  function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    const totalSpan = document.getElementById('carrito-total');
    const countSpan = document.getElementById('carrito-count');
  
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    countSpan.textContent = totalItems;
  
    if (carrito.length === 0) {
      itemsDiv.innerHTML = '<p class="carrito-vacio">Aún no has agregado servicios</p>';
      totalSpan.textContent = 'Q0';
      return;
    }
  
    itemsDiv.innerHTML = '';
    carrito.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('carrito-item');
      div.innerHTML = `
        <span class="item-nombre">${item.nombre} x${item.cantidad}</span>
        <span class="item-precio">Q${item.precio * item.cantidad}</span>
        <button class="btn-quitar" onclick="quitarDelCarrito(${item.id})">✕</button>
      `;
      itemsDiv.appendChild(div);
    });
  
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalSpan.textContent = `Q${total}`;
  }
  
  function enviarWhatsApp() {
    if (carrito.length === 0) {
      alert('Agrega al menos un servicio antes de enviar.');
      return;
    }
  
    const numero = '50233837847';
    let mensaje = '¡Hola BarberKing! Quiero agendar los siguientes servicios:\n\n';
  
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} x${item.cantidad} — Q${item.precio * item.cantidad}\n`;
    });
  
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mensaje += `\n*Total: Q${total}*`;
    mensaje += '\n\n¿Tienen disponibilidad?';
  
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
  
  generarTarjetas();