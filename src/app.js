// Inicio el servidor
const express = require("express");
const database = require("./database");
// Creo el servidor
const app = express();
// Usar middleware
app.use(express.json());

const generateId = () => {
    return new Date().getTime()
}

// Creo las rutas
// Página de inicio
app.get("/", (req, res) => {
    res.send("<h1>Hola, bienvenido a mi librería. ¿Cómo querés proceder?</h1>");
});
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
    } else
    res.json({ "mensaje": "El libro no existe" });
});
// Crear un nuevo libro
app.post("/books/", (req, res) => {
    const id = generateId()
    const { title, author, year } = req.body;
    database.push({ id: id, title: title, author: author, year: year });

    res.json({ message: "Libro creado con éxito" });
});
// Modificar o actualizar un libro
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, year } = req.body;


    const editarLibro = database.find((book) => book.id === id);

    if (editarLibro) {
        editarLibro.title = title;
        editarLibro.author = author;
        editarLibro.year = year;
        res.json({ message: "Libro actualizado" });
    } else {
        res.json({ mensaje: "El libro que quiere modificar no existe" });
    }
});
// Eliminar un libro por su id
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const getBook = database.find((título) => título.id === id);
    if (!getBook) {
        res.json("El libro que quiere eliminar no existe")
    } else {
        const bookIndex = database.indexOf(getBook);
        const deleteBook = database.splice(bookIndex, 1);

        res.json({ mensaje: "Libro borrado con exito", deleteBook });
    }
});

// Corro el servidor
app.listen(3000, console.log("Servidor corriendo en el puerto 3000"));