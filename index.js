//const express = require('express')
//const { Server: HttpServer } = require('http')
//const { Server: Socket } = require('socket.io')

import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

import Contenedor from "./controllers/Contenedor.js";
import { options as optionsSQLite3 } from "./options/SQLite3.js";
import { options as optionsMariaDB } from "./options/mariaDB.js";

const tablaMensajes = "mensajes";
const tablaProductos = "productos";

const chatCont = new Contenedor(optionsSQLite3, tablaMensajes);
const productosCont = new Contenedor(optionsMariaDB, tablaProductos);

let productos = [];
const catalogo = await productosCont.getAll();
productos = catalogo.slice();

let mensajes = [];
const historial = await chatCont.getAll();
mensajes = historial.slice();

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("update", (producto) => {
    productosCont.save(producto);
    productos.push(producto);
    io.sockets.emit("productos", productos);
  });

  socket.on("nuevo-mensaje", (data) => {
    chatCont.save(data);
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
