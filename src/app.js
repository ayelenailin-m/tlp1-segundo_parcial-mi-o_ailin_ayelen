/*
Escenario Gestión de Libros:
Desarrolla un servidor Express que permita gestionar una lista de libros. Implementa las siguientes rutas:
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
    res.json({ "mensaje": "El libro no existe" });
});
// Crear un nuevo libro
app.post("/books/", (req, res) => {
    const { id, título, autor, año } = req.body;
    database.push({ id: id, título: título, autor: autor, año: año });

    res.json({ message: "Libro creado con éxito" });
});
// Modificar o actualizar un libro
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { título, autor, año } = req.body;

    const editarLibro = database.find((book) => book.id === id);

    if (editarLibro){
    editarLibro.título = título;
    editarLibro.autor = autor;
    editarLibro.año = año;
    res.json({ message: "Libro actualizado" });
    } 
    res.json({ mensaje: "El libro que quiere modificar no existe"});
});






// Corro el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto:${PORT}`));