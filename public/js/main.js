const socket = io();

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  // previene que el formulario recargue la pagina al hacer submit
  e.preventDefault();

  // se asigna producto extrayendo los datos de los campos del formulario
  const producto = {
    title: formAgregarProducto[0].value,
    price: formAgregarProducto[1].value,
    thumbnail: formAgregarProducto[2].value,
  };

  // se envía el producto al servidor via socket
  socket.emit("update", producto);

  // limpia el contenido de los campos del formulario
  formAgregarProducto.reset();
});

// maneja eventos de tipo 'productos'
socket.on("productos", manejarEventoProductos);

async function manejarEventoProductos(productos) {
  const recursoRemoto = await fetch("layouts/tabla-productos.hbs");
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);
  const html = functionTemplate({ productos });
  document.getElementById("productos").innerHTML = html;
}

// maneja eventos de tipo mensajes
socket.on("mensajes", manejarEventoMensajes);

async function manejarEventoMensajes(mensajes) {
  const recursoRemoto = await fetch("layouts/chat.hbs");
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);
  const html = functionTemplate({ mensajes });
  document.getElementById("mensajes").innerHTML = html;
  console.log(document.getElementById("mensajes").innerHTML);
}

//funcion auxiliar da formato a Date()
const formatoDate = () => {
  let date = new Date();
  let fecha = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + 
  date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return fecha;
}

const formEnviarMensaje = document.getElementById("formEnviarMensaje");
formEnviarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();
  let fecha = formatoDate()
  const mensaje = {
    email: document.getElementById("email").value,
    fechaHora: fecha,
    mensaje: formEnviarMensaje[0].value,
  };
  socket.emit("nuevo-mensaje", mensaje);
  formEnviarMensaje.reset();
});
