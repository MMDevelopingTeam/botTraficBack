const { encrypt, compare } = require('../utils/handleBcrypt')
const userModels = require('../models/user');
const userAdminModels = require('../models/userAdmin');
const userTypeModels = require('../models/userType');
const headquartersModels = require('../models/headquarters');
const modelModels = require('../models/models');
const jwt = require('jsonwebtoken');

// login
const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user =  await userModels.findOne({email}).populate({path: 'userTypeArray'})
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
  
  const { name, user, email, password, userTypeArray, headquarters_idHeadquarter } = req.body;

  // return console.log(userTypeArray[1]);
  try {
    for (let index = 0; index < userTypeArray.length; index++) {
      const dataUserT = await userTypeModels.findOne({_id: userTypeArray[index]})
      if (!dataUserT) {
        return res.status(403).send({
          success: false,
          message: `El tipo de usuario ${userTypeArray[index]} no existe`
        });
      }
      
    }
  } catch (error) {
    return res.status(400).send({
        success: false,
        message: error.message
    });
  }
  try {
      const dataUser = await userModels.findOne({email})
      if (dataUser) {
        return res.status(403).send({
          success: false,
          message: 'El correo ya esta registrado'
        });
      }
      const dataUserAdmin = await userAdminModels.findOne({email})
      if (dataUserAdmin) {
        return res.status(403).send({
          success: false,
          message: 'El correo ya esta registrado'
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
          user,
          email,
          password: passwordHash,
          userTypeArray,
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
    const dataUser = await userModels.findOne({_id: id}).populate({ path: 'userTypeArray' })
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

// get by user token
const getMe = async (req, res) => {

  const token = req.headers.authorization.split(' ').pop();
  try {
    const payload = jwt.verify(token, process.env.KEY_JWT)
    const id = payload._id
    const dataUser = await userModels.findOne({ _id: id }).populate({path: 'userTypeArray'})
    if (!dataUser) {
      return res.status(403).send({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Usuario encontrado exitosamente',
      dataUser
    });
  } catch (error) {
    return res.status(403).send({
        success: false,
        message: error.message
    });
  }
}

// get user by email
const GetUserByEmail = async (req, res) => {
  const { email } = req.params
  if (email === ':email') {
      return res.status(400).send({
          success: false,
          message: "email es requerido"
      });
  }
  try {
    const dataUser = await userModels.findOne({email})
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

// get user by headQ
const GetUser = async (req, res) => {
  const { id } = req.params
  if (id === ':id') {
      return res.status(400).send({
          success: false,
          message: "id es requerido"
      });
  }
  try {
    const dataUsers = await userModels.find({headquarters_idHeadquarter: id})
    if (!dataUsers) {
        return res.status(400).send({
            success: false,
            message: "Usuarios no encontrado"
        });
    }
    return res.status(200).send({
      success: true,
      message: "Usuarios traidos correctamente.",
      dataUsers
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
  const { name, user, email, password, userTypeArray, headquarters_idHeadquarter } = req.body;
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
    if (user != undefined) {
      dataUser.user=user
    }
    if (email != undefined) {
      dataUser.email=email
    }
    if (password != undefined) {
      dataUser.password=password
    }
    if (userTypeArray != undefined) {
      try {
        for (let index = 0; index < userTypeArray.length; index++) {
          const dataUserT = await userTypeModels.findOne({_id: userTypeArray[index]})
          if (!dataUserT) {
            return res.status(403).send({
              success: false,
              message: `El tipo de usuario ${userTypeArray[index]} no existe`
            });
          }
          
          dataUser.userTypeArray=dataUser.userTypeArray.concat(userTypeArray[index])
        }
      } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message  
        });
      }
    }
    if (headquarters_idHeadquarter != undefined) {
      const dataheadquarters = await headquartersModels.findOne({_id: headquarters_idHeadquarter})
      if (!dataheadquarters) {
          return res.status(400).send({
              success: false,
              message: "Sede no encontrada"
          });
      }
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

// get token bot
const tokenBot = async (req, res) => {
  const { nameModel, userId } = req.body;
  const dataModel = await modelModels.findOne({nickname: nameModel})
  if (!dataModel) {
    return res.status(400).send({
      success: false,
      message: "modelo no encontrada."
    });
  }
  if (dataModel.isAllowed === false) {
    return res.status(400).send({
      success: false,
      message: "modelo no permitida."
    });
  }

  const dataUser = await userModels.findOne({ _id: userId }).populate({path: 'userTypeArray'})
  if (!dataUser) {
    return res.status(400).send({
      success: false,
      message: "Usuario no encontrado."
    });
  }
  for (let index = 0; index < dataUser.userTypeArray.length; index++) {
    if (dataUser.userTypeArray[index].nameUserType === 'moderator') {
      break;
    }else{
      return res.status(400).send({
        success: false,
        message: "No tiene autorizacion."
      });
    }
  }
  const dataHeadQ = await headquartersModels.findOne({_id: dataModel.headquarters_idHeadquarter})
  if (!dataHeadQ) {
    return res.status(400).send({
      success: false,
      message: "Sede no encontrada."
    });
  }
  try {
    const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany}, process.env.KEY_JWT)
    return res.status(200).send({
      success: true,
      message: "Token creado correctamente",
      token
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}
module.exports = {signIn, signUp, GetUserByID, GetUser, GetUserByEmail, getMe, deleteUser, updateUser, tokenBot};