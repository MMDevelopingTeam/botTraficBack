const { encrypt, compare } = require('../utils/handleBcrypt')
const userModels = require('../models/user');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user =  await userModels.findOne({email})
    if (!user) return res.status(404).send({
      success: false,
      message: "El usuario no existe"
    });

    const checkPassword = await compare(password, user.password)
    if (checkPassword) {
      const token = jwt.sign({_id: user._id}, process.env.KEY_JWT)
      return res.status(200).json({
        success: true,
        message: "login exitoso",
        token,
        user
      })
    } else {
      return res.status(403).send({
        success: false,
        message: "Password incorrecto"
      });
    }
}

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const dataUser = await userModels.findOne({email})
    if (dataUser) {
      return res.status(403).send({
        success: false,
        message: 'El correo ya esta registrado'
      });
    }

    try {
        const passwordHash = await encrypt(password)
        const newUser = new userModels({
            username,
            email,
            password: passwordHash
        });
        await newUser.save();
        const token = jwt.sign({_id: newUser._id }, process.env.KEY_JWT)
    
        return res.status(201).send({
            success: true,
            message: "Usuario creado correctamente",
            token,
            newUser
        });
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
          });
    }
}

module.exports = {signIn, signUp};