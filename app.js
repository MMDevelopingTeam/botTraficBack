const express = require("express")
const initDB = require('./config/db')
const cors = require("cors")
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express()

app.use(cors())
app.use(express.json())
app.use(
    bodyParser.json({limit: '20mb'})
)
app.use(
    bodyParser.urlencoded({limit: '20mb', extended: true})
)

const port = process.env.PORT || 3000

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})

//Rutas
app.use("/api", require("./routes"))

initDB();

app.listen(port, () => {
    console.log(`App lista por http://localhost:${port}`);
})
