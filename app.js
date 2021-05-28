const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const port = process.env.PORT || 3000;
const app = express();
const path = require('path')
const nodemailer = require('nodemailer')

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));



//mysql
const connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_rivaldo',
    password: '1234567890',
    database: 'freedbtech_proyectoFinalRivaldoDB'
});

//check connection
connection.connect(error => {
    if (error) throw error;
    console.log('Database running ');
})

//route
app.get('/', (req, res) => res.render('pages/index'))


//Lista de customers
app.get('/Clientes', (req, res) => {

    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/index', {
            'results': results
        });
    });
});

app.get('/formulario', (req, res) => res.render('pages/formulario'))

app.post('/add', (req, res) => {

    const sql = `SELECT * FROM clientes WHERE email = '${req.body.email}'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        const customerObj = {
            nombre, cedula, Grado, date, sexo, bio, email, telefono
        } = req.body

        contentHTML = `
    <h1>Client Information</h1>
    <ul>
        <li>Nombre: ${nombre}</li>
        <li>cedula: ${cedula}</li>
        <li>grado: ${Grado}</li>
        <li>date: ${date}</li>
        <li>sexo: ${sexo}</li>
        <li>email: ${email}</li>
        <li>telefono: ${telefono}</li>
    </ul>
    
    <p>Bio: <br> ${bio}</p>
`
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proyectofinalrivaldo@gmail.com',
        pass: 'klk123456@'
    }
})

const mailOption = {
    from: 'proyectofinalrivaldo@gmail.com', // sender address
    to: 'rivaldoramosn30@gmail.com', // receiver
    subject: "Contact form", // Subject
    html: contentHTML // html body
};

        if (!results.length > 0) {
            const sql2 = 'INSERT INTO clientes SET ?';

            connection.query(sql2, customerObj, error => {
                if (error) throw error;
            });


        } 
        transporter.sendMail(mailOption, err => {
            if (err) throw err
            else console.log('Email enviado!');
        })
        res.render('pages/index');
    });
    
});

app.listen(port, () => console.log('Server Running'))