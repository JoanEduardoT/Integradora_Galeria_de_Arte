import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

const db = mysql.createPool({
    host: '31.170.165.191',
    user: 'mysql',
    password: 'jBxkgmRGvP67yBT1QD6nsYTSJfUwMK8ofMpmFT7VS3JEaEBqmJAnNjevdMjyW1HV',
    database: 'default',
    port: '3307',
});

// Verificar conexión a la base de datos
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos establecida correctamente');
        connection.release();
    }
});

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE ID = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.post('/register', (req, res) => {
    const { name, lastname, email, pass, address, city, birth, phone } = req.body;

    if (!email || !pass) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }
        console.log('Contraseña encriptada:', hashedPassword);

        db.query('INSERT INTO users (name, lastname, email, password, address, city, phone, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, lastname, email, hashedPassword, address, city, phone, birth], 
        (err, result) => {
            if (err) {
                console.error('Error al insertar el usuario:', err);
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar el usuario:', err);
            return res.status(500).json({ message: 'Error al buscar el usuario' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        bcrypt.compare(pass, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err);
                return res.status(500).json({ message: 'Error al comparar las contraseñas' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, 'tu_clave_secreta', { expiresIn: '1h' });

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token,
                user: { id: user.id }
            });
        });
    });
});



app.get('/auction/:id', (req, res) => {
    const auctionId = req.params.id;
    
    console.log("ID recibido en backend:", auctionId); // 👀 Depuración

    // Consulta que obtiene el tiempo restante junto con el endedtime
    db.query(
        `SELECT endedtime, TIMESTAMPDIFF(SECOND, NOW(), endedtime) AS timeLeft 
         FROM auctions WHERE id = ?`, 
        [auctionId], 
        (err, results) => {
            if (err) {
                console.error('Error al obtener la subasta:', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            console.log("Resultados de MySQL:", results); // 👀 Verifica qué devuelve la BD

            if (results.length === 0) {
                return res.status(404).json({ error: 'Subasta no encontrada' });
            }

            res.json({ 
                endTime: results[0].endedtime,
                timeLeft: results[0].timeLeft // Tiempo restante en segundos
            });
        }
    );
});


app.get('/api/auctions', (req, res) => {
    const query = `
        SELECT a.*, ar.*
        FROM auctions a
        JOIN artworks ar ON a.artworkID = ar.id
        WHERE a.status = "Activa"
    `;  

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener subastas:', err);
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);
    });
});



app.get('/api/auction/:id', (req, res) => {
    const auctionId = req.params.id;
    
    console.log("ID recibido en backend:", auctionId); // 👀 Depuración

    // Consultar los detalles de la subasta y la obra de arte relacionada
    const query = `
        SELECT a.*, ar.*,at.*
        FROM auctions a
        JOIN artworks ar ON a.artworkId = ar.id
        JOIN users at ON ar.artistId = at.id
        WHERE a.id = ?`;

    db.query(query, [auctionId], (err, results) => {
        if (err) {
            console.error('Error al obtener los detalles de la subasta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Subasta no encontrada' });
        }

        // Devolver los detalles de la subasta y la obra de arte
        res.json(results[0]);  // Devolvemos el primer resultado, que contiene tanto la subasta como el artwork
    });

});


