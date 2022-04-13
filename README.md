Emmanuel Perez - Desafío DB

Para ejecutar la aplicación:

I - Levante el servidor MySQL

II - Crear en MySQL schema Base de Datos de nombre "ecommerce"

II - Ingrese estas instrucciones en la terminal:

1- npm run crearTablas

2- npm start

Acceder a la web en la url localhost:8080

Datos pre configurados de acceso a la Base de Datos MySQL:
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"

O bien modificar tales datos en el archivo:
    options/mariaDB.js

Dependencias utilizadas: 
    express,
    express-handlebars@5.2.0,
    knex@0.95.12,
    mysql,
    socket.io,
    sqlite3


*----------------------- Abril - 2022 --------------------------*