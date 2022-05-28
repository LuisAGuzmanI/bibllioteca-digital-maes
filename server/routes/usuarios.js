import express from 'express';
const router = express.Router()

import usuarioSchema from '../models/usuario.js'

router.post('/', (req, res) => {
    const usuario = usuarioSchema(req.body);
    usuario.save()
     .then((data) => res.json(data))
     .catch((error) => res.json({message: error}))
    // res.send('create user');
})

router.get('/getAllUsers', (req, res) => {
    usuarioSchema.find()
     .then((data) => res.json(data))
     .catch((error) => res.json({message: error}))
    // res.send('create user');
})

router.get('/getUser/:id', (req, res) => {
    const {id} = req.params;
    usuarioSchema.findById(id)
     .then((data) => res.json(data))
     .catch((error) => res.json({message: error}))
    // res.send('create user');
})

router.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, edad, email } = req.body;
    
    // Se pasan 2 objetos, uno con los parametros que queremos que coincidan (en este caso solo la ID) y otro con los datos que se van a actualizar
    usuarioSchema.updateOne({_id: id}, {$set: {nombre, edad, email} })
     .then((data) => res.json(data))
     .catch((error) => res.json({message: error}))
    // res.send('create user');
})

router.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;

    usuarioSchema.remove({_id: id})
     .then((data) => res.json(data))
     .catch((error) => res.json({message: error}))
    // res.send('create user');
})
 
export default router;