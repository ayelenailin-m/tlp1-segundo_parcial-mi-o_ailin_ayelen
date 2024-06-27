/*
Escenario Gestión de Libros:
Desarrolla un servidor Express que permita gestionar una lista de libros. Implementa las siguientes rutas:
GET /books/:id Devuelve un único libro según el id recibido por parámetro (params).
POST /books/: Permite agregar un nuevo libro. El libro debe tener un id único, un title, un author, y un year.
PUT /books/:id : Permite actualizar el título, autor y año de publicación de un libro existente.
DELETE /books/:id : Permite eliminar un libro por su id.
*/
// Inicio el servidor
const express = require("express");
const database = require("./database");
// Creo el servidor
const app = express();
// Usar middleware
app.use(express.json());

// Creo las rutas
// Obtener todos los libros
app.get("/books/", (req, res) => {
    res.json(database);
});
// Obtener un único libro por su id
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const getBook = database.find((book) => book.id === id);
    if (getBook) {
        res.json(getBook);
    } 
    res.json({"mensaje": "El libro no existe"});
});











// Corro el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto:${PORT}`));