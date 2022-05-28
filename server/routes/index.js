import express from "express";
const mainRouter = express.Router();

import usuariosRouter from "./usuarios.js";

mainRouter.use("/usuarios", usuariosRouter);

export default mainRouter;