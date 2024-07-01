// Importamos el modulo express y mysql
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

// Verifica que la carpeta 'img' exista o créala si no existe
const imgFolder = path.join(__dirname,'..' ,'img');

// Configuramos multer para almacenar las imágenes en la carpeta 'img'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imgFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// Creamos una instancia de express
const app = express();

// Configuración de CORS para permitir todas las solicitudes
app.use(cors());

// Declaracion del puerto
const PORT = 3000;

// Configuracion de la conexion a la bd
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "web_tejidos"
});

// Conectamos a la bd
db.connect((err) => {
    if(err){
        console.error("Error al conectar con la base de datos: ", err);
        return;
    }
    console.log("Conexion a la base de datos MySQL exitosa");
})

// Servir archivos al front
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Ruta para obtener datos de la bd
app.get("/prenda",(req,res) => {
    const query = "SELECT * FROM prenda";
    db.query(query, (err, results) => {
        if(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error al obtener datos de la base de datos");
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener por id
app.get("/prenda/:id", (req, res) => {
    const prendaId = req.params.id;
    const query = "SELECT * FROM prenda WHERE id_prenda = ?";
    db.query(query, [prendaId], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error al obtener datos de la base de datos");
            return;
        }
        if (results.length === 0) {
            res.status(404).send("Prenda no encontrada");
            return;
        }
        res.json(results[0]);
    });
});

// Ruta para crear una nueva prenda
app.post('/prenda', upload.single('imagen'), (req, res) => {
    const { nombre, descripcion, categoria_id, autor_id } = req.body;
    const imagen = req.file.filename; // Nombre del archivo subido
    const query = 'INSERT INTO prenda (nombre, descripcion, categoria_id, autor_id, imagen) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, categoria_id, autor_id, imagen], (err, results) => {
        if (err) {
            console.error('Error al insertar la prenda:', err);
            res.status(500).send('Error al crear la prenda');
            return;
        }
        res.status(201).json({ message: 'Prenda creada exitosamente' });
    });
});

// Ruta para eliminar una prenda por id
app.delete('/prenda/:id', (req, res) => {
    const prendaId = req.params.id;
    // Primero obtenemos la prenda para conocer el nombre de la imagen
    const getQuery = 'SELECT imagen FROM prenda WHERE id_prenda = ?';
    db.query(getQuery, [prendaId], (err, results) => {
        if (err) {
            console.error('Error al obtener la prenda:', err);
            res.status(500).send('Error al eliminar la prenda');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Prenda no encontrada');
            return;
        }
        const imagen = results[0].imagen;
        // Eliminamos la prenda de la base de datos
        const deleteQuery = 'DELETE FROM prenda WHERE id_prenda = ?';
        db.query(deleteQuery, [prendaId], (err, results) => {
            if (err) {
                console.error('Error al eliminar la prenda:', err);
                res.status(500).send('Error al eliminar la prenda');
                return;
            }
            // Luego eliminamos la imagen del sistema de archivos
            const imgPath = path.join(imgFolder, imagen);
            fs.unlink(imgPath, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen:', err);
                    res.status(500).send('Prenda eliminada pero ocurrió un error al eliminar la imagen');
                    return;
                }
                res.status(200).json({ message: 'Prenda e imagen eliminadas exitosamente' });
            });
        });
    });
});

// Ruta para actualizar una prenda
app.put('/prenda/:id', upload.single('imagen'), (req, res) => {
    const prendaId = req.params.id;
    const { nombre, descripcion, categoria_id, autor_id } = req.body;

    // Primero obtenemos la prenda actual para conocer el nombre de la imagen actual
    const getQuery = 'SELECT imagen FROM prenda WHERE id_prenda = ?';
    db.query(getQuery, [prendaId], (err, results) => {
        if (err) {
            console.error('Error al obtener la prenda:', err);
            res.status(500).send('Error al actualizar la prenda');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Prenda no encontrada');
            return;
        }
        
        const currentImage = results[0].imagen;
        let updateQuery = 'UPDATE prenda SET nombre = ?, descripcion = ?, categoria_id = ?, autor_id = ?';
        let queryParams = [nombre, descripcion, categoria_id, autor_id];

        if (req.file) {
            updateQuery += ', imagen = ?';
            queryParams.push(req.file.filename);
        }

        updateQuery += ' WHERE id_prenda = ?';
        queryParams.push(prendaId);

        db.query(updateQuery, queryParams, (err, results) => {
            if (err) {
                console.error('Error al actualizar la prenda:', err);
                res.status(500).send('Error al actualizar la prenda');
                return;
            }

            if (req.file) {
                // Si hay una nueva imagen, eliminamos la imagen antigua
                const imgPath = path.join(imgFolder, currentImage);
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la imagen antigua:', err);
                        res.status(500).send('Prenda actualizada pero ocurrió un error al eliminar la imagen antigua');
                        return;
                    }
                });
            }

            res.json({ message: 'Prenda actualizada exitosamente' });
        });
    });
});


// Inicializacion del servidor
app.listen(PORT, ()=>{
    console.log(`servidor escuchando el puerto: ${PORT}`)
});