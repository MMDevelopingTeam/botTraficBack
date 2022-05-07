const { encrypt, compare } = require('../utils/handleBcrypt')
const userModels = require('../models/user');
const userTypeModels = require('../models/userType');
const headquartersModels = require('../models/headquarters');
const jwt = require('jsonwebtoken');

// login
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
// register
const signUp = async (req, res) => {
  
  const { name, username, email, password, userType_idUserType, headquarters_idHeadquarter } = req.body;
  try {
      const dataUser = await userModels.findOne({email})
      if (dataUser) {
        return res.status(403).send({
          success: false,
          message: 'El correo ya esta registrado'
        });
      }
      const dataUserType = await userTypeModels.findOne({_id: userType_idUserType})
      if (!dataUserType) {
        return res.status(403).send({
          success: false,
          message: 'Tipo de usuario no encontrado'
        });
      }
      const dataHeadquarters = await headquartersModels.findOne({_id: headquarters_idHeadquarter})
      if (!dataHeadquarters) {
        return res.status(403).send({
          success: false,
          message: 'Sede no encontrada'
        });
      }
      const passwordHash = await encrypt(password)
      const newUser = new userModels({
          name,
          username,
          email,
          password: passwordHash,
          userType_idUserType,
          headquarters_idHeadquarter
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
// get user by id
const GetUserByID = async (req, res) => {
  const { id } = req.params
  if (id === ':id') {
      return res.status(400).send({
          success: false,
          message: "id es requerido"
      });
  }
  try {
    const dataUser = await userModels.findOne({_id: id})
    if (!dataUser) {
        return res.status(400).send({
            success: false,
            message: "Usuario no encontrado"
        });
    }
    return res.status(200).send({
      success: true,
      message: "Usuario traido correctamente.",
      dataUser
  });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
  });
  }
}
// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params
  if (id === ':id') {
      return res.status(400).send({
          success: false,
          message: "id es requerido"
      });
  }
  try {
    const dataUser = await userModels.findOne({_id: id})
    if (!dataUser) {
        return res.status(400).send({
            success: false,
            message: "Usuario no encontrado"
        });
    }
    await userModels.deleteOne({_id: id})
    return res.status(200).send({
      success: true,
      message: "Usuario eliminado correctamente."
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}
// update user
const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, username, email, password, userType_idUserType, headquarters_idHeadquarter } = req.body;
  if (id === ':id') {
      return res.status(400).send({
          success: false,
          message: "id es requerido"
      });
  }
  try {
    const dataUser = await userModels.findOne({_id: id})
    if (!dataUser) {
        return res.status(400).send({
            success: false,
            message: "Usuario no encontrado"
        });
    }
    if (name != undefined) {
      dataUser.name=name
    }
    if (username != undefined) {
      dataUser.username=username
    }
    if (email != undefined) {
      dataUser.email=email
    }
    if (password != undefined) {
      dataUser.password=password
    }
    if (userType_idUserType != undefined) {
      dataUser.userType_idUserType=userType_idUserType
    }
    if (headquarters_idHeadquarter != undefined) {
      dataUser.headquarters_idHeadquarter=headquarters_idHeadquarter
    }
    await dataUser.save()
    return res.status(200).send({
      success: true,
      message: "Usuario actualizado correctamente."
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}
module.exports = {signIn, signUp, GetUserByID, deleteUser, updateUser};