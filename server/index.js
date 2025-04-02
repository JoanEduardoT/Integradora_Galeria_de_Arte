import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import dotenv from 'dotenv';



const app = express();

const db = mysql.createPool({
    host: '31.170.165.191',
    user: 'mysql',
    password: 'jBxkgmRGvP67yBT1QD6nsYTSJfUwMK8ofMpmFT7VS3JEaEBqmJAnNjevdMjyW1HV',
    database: 'default',
    port: '3307',
});
 


/* const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gallerydb',
}); */


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
dotenv.config();

app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});

//-----------------------------------------------------------------

app.get('/stripe-success', (req, res) => {
    res.redirect('miapp://success');
});

app.get('/stripe-cancel', (req, res) => {
    res.redirect('miapp://cancel');
});


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount } = req.body; // 🔥 Recibe el monto desde el frontend

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'mxn', // 🔥 Cambia la moneda si es necesario
                        product_data: { name: 'Compra en la tienda' },
                        unit_amount: amount, // 💰 Stripe maneja precios en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://dog0s0gwksgs8osw04csg0cs.31.170.165.191.sslip.io/stripe-success',
            cancel_url: 'https://dog0s0gwksgs8osw04csg0cs.31.170.165.191.sslip.io/stripe-cancel',
            
        });

        res.json({ url: session.url }); 
    } catch (error) {
        console.error('Error al crear la sesión de pago:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
});


//--------------------------------------------------------------
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

//-------------------------------------------------------------------------------------}
app.get('/creatorartworks/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM artworks WHERE artistid = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/artworks/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM artworks WHERE ID = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/artworks', (req, res) => {
    db.query('SELECT * FROM artworks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/categorias/:id', (req, res) => {
    db.query('SELECT * FROM categorias WHERE ID = ?', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
//-------------------------------------------------------------------------------------


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
        SELECT a.*
        FROM auctions a
        WHERE a.status = "Activa" `;  

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
        SELECT a.*
        FROM auctions a
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


app.get('/artworks/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM artworks WHERE ID = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});


app.get('/artworks', (req, res) => {
    db.query('SELECT * FROM artworks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});


app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/categorias/:id', (req, res) => {
    db.query('SELECT * FROM categorias WHERE ID = ?', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});


app.post('/api/bid', (req, res) => {
    console.log("datos recibidos: ",req.body)

    const { auctionId, bidAmount } = req.body; 

    if (!auctionId || !bidAmount) {
        return res.status(400).json({ success: false, message: 'Faltan datos en la solicitud' });
    }

/*     db.query('SELECT currentBid FROM auctions WHERE id = ?', [auctionId], (err, results) => {
        if (err) {
            console.error('Error al obtener la subasta:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Subasta no encontrada' });
        }

        const currentBid = results[0].currentBid;

        if (bidAmount <= currentBid) {
            return res.json({ success: false, message: 'La puja debe ser mayor' });
        } */

        db.query('UPDATE auctions SET currentBid = ? WHERE id = ?', [bidAmount, auctionId], (updateErr) => {
            if (updateErr) {
                console.error('Error al actualizar la puja:', updateErr);
                return res.status(500).json({ success: false, message: 'Error al actualizar la puja' });
            }

            res.json({ success: true, newBid: bidAmount });
        });
    });
