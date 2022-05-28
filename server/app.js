import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
let port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get("/", (req, res) => {
    res.send(JSON.stringify({
        message: "Welcome to my API :)"
    }));
})
 
// Cargar todas las rutas
import mainRouter from "./routes/index.js";
app.use("/api", mainRouter);

//Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conected to MongoDB Atlas'))
.catch((error) => console.error('Failed MongoDB Atlas Connection', error))

// Iniciar servidor en el puerto deseado
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
