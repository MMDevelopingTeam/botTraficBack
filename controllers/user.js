const { encrypt, compare } = require('../utils/handleBcrypt')
const userModels = require('../models/user');
const userAdminModels = require('../models/userAdmin');
const superUserModels = require('../models/grantFullAdmin');
const userTypeModels = require('../models/userType');
const headquartersModels = require('../models/headquarters');
const registerLicensesModels = require('../models/registerLicenses');
const botContainerModels = require('../models/botContainer');
const modelModels = require('../models/models');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// login
const signIn = async (req, res) => {
    const { email, password } = req.body;
    let user = null
    const dataUser = await userModels.findOne({email})
    const dataUserAdmin = await userAdminModels.findOne({email})
    const dataSuperU = await superUserModels.findOne({email})
    if (dataUser || dataUserAdmin || dataSuperU) {
      user=dataUser || dataUserAdmin || dataSuperU
    }else{
      return res.status(404).send({
        success: false,
        message: "El usuario no existe"
      });
    }
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

// get Type User By Token

const getTypeUserByToken = async (req, res) => {
  const token = req.headers.authorization.split(' ').pop();
  try {
    const payload = jwt.verify(token, process.env.KEY_JWT)
    const id = payload._id
    
    let user = null;
    
    const dataUser = await userModels.findOne({_id: id})
    const dataUserAdmin = await userAdminModels.findOne({_id: id})
    const dataSuperU = await superUserModels.findOne({_id: id})

    if (dataUser || dataUserAdmin || dataSuperU) {
      user=dataUser || dataUserAdmin || dataSuperU
    }else{
      return res.status(404).send({
        success: false,
        message: "El usuario no existe"
      });
    }

    if (user.userTypeArray) {
      return res.status(200).send({
        success: true,
        message: 'Tipo de usuario encontrado exitosamente',
        user: true
      });
    }
    if (user.company_idCompany) {
      return res.status(200).send({
        success: true,
        message: 'Tipo de usuario encontrado exitosamente',
        userAdmin: true
      });
    }
    if (user.ipFrom) {
      return res.status(200).send({
        success: true,
        message: 'Tipo de usuario encontrado exitosamente',
        superUser: true
      });
    }
  } catch (error) {
    return res.status(403).send({
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
  const { nameModel, userId, nBots } = req.body;
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
  const dataReg = await registerLicensesModels.findOne({companys_idCompany: dataHeadQ.company_idCompany})

 
  let botsRes = nBots;
  let botsDisponibles=null;

  const dataBot = await botContainerModels.find(({isActive: true}))

  if (dataBot.length === 0) {
    return res.status(400).send({
      success: false,
      message: `No hay botContainers activos`
    });
  }

  for (let index = 0; index < dataBot.length; index++) {
    dataBot[index].CompnaysArray.map((data) => {
      if (String(data.id) === String(dataHeadQ.company_idCompany)) {
        botsDisponibles=botsDisponibles+data.AcctsFree
      }
    })
  }
  for (let index = 0; index < dataBot.length; index++) {
    let newArray=[]
    dataBot[index].CompnaysArray.map((data) => {
      newArray.push(String(data.id))
    })
    let i = newArray.indexOf(String(dataHeadQ.company_idCompany))

    if (i != -1) {
      if (botsRes > botsDisponibles || botsRes > dataReg.licenses_idLicense.numberAccts) {
        return res.status(400).send({
          success: false,
          message: `No puedes lanzar ${botsRes} bots`
        }); 
      }
      if (dataBot[index].CompnaysArray[i].AcctsUsed > botsRes) {
        let url = `http://${dataBot[index].ip}:3000/api/bot`;
        const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany, nBots: botsRes}, process.env.KEY_JWT)
        axios.post(url, {token})
        .then(function (response) {
          if (response.data.success === true) {
            console.log("object", index);
            let datosBot=dataBot[index]
            datosBot.CompnaysArray[i].AcctsFree=parseInt(datosBot.CompnaysArray[i].AcctsUsed)-parseInt(botsRes)
            botContainerModels.findOneAndUpdate(
              {_id: dataBot[index]._id},
              { $set: datosBot},
              (err, doc) => {
                if (err) {
                  console.log(err);
                }
              }
            )
            // res.status(200).send({
            //   success: true,
            //   message: response.data.message,
            // });
          }
        })
        .catch(function (error) {
          return console.log(error.message);
        });
        break;
      }
      if (dataBot[index].CompnaysArray[i].AcctsUsed < botsRes) {
        botsRes=botsRes-dataBot[index].CompnaysArray[i].AcctsUsed
        let url = `http://${dataBot[index].ip}:3000/api/bot`;
        const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany, nBots: dataBot[index].CompnaysArray[i].AcctsUsed}, process.env.KEY_JWT)
        axios.post(url, {token})
        .then(function (response) {
          if (response.data.success === true) {
            console.log("object2", index);
            let datosBot=dataBot[index]
            datosBot.CompnaysArray[i].AcctsFree=0
            botContainerModels.findOneAndUpdate(
              {_id: dataBot[index]._id},
              { $set: datosBot},
              (err, doc) => {
                if (err) {
                  console.log(err);
                }
              }
            )
            // res.status(200).send({
            //   success: true,
            //   message: response.data.message,
            // });
          }
        })
        .catch(function (error) {
          return console.log(error.message);
        });
      }
    }
  }

  // return res.status(200).send({
  //   success: true,
  //   message: "Token creado correctamente",
  //   token
  // });
  // return console.log(String(dataHeadQ.company_idCompany));
  // try {
  //   const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany, nBots}, process.env.KEY_JWT)
  //   return res.status(200).send({
  //     success: true,
  //     message: "Token creado correctamente",
  //     token
  //   });
  // } catch (error) {
  //   return res.status(400).send({
  //     success: false,
  //     message: error.message
  //   });
  // }
}

// get token killBot
const tokenKillBot = async (req, res) => {
  const { nameModel, userId, nBots } = req.body;
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

  let lengthAllKillsBots=0
  let botsRestatnes=nBots
  const dataBot = await botContainerModels.find({isActive: true})

  if (dataBot.length === 0) {
    return res.status(400).send({
      success: false,
      message: `No hay botContainers activos`
    });
  }

  for (let index = 0; index < dataBot.length; index++) {
    let url = `http://${dataBot[index].ip}:3000/api/storage/getKillBotsByModel`;
    const dataK = await axios.post(url, {nameModel})
    lengthAllKillsBots=lengthAllKillsBots+dataK.data.acctsModelsLength
  }
  
  if (nBots > lengthAllKillsBots) {
    return res.status(400).send({
      success: false,
      message: `No es posible matar ${nBots} bots`
    });
  }

  for (let index = 0; index < dataBot.length; index++) {
    let newArray=[]
    dataBot[index].CompnaysArray.map((data) => {
      newArray.push(String(data.id))
    })
    let i = newArray.indexOf(String(dataHeadQ.company_idCompany))

    let urlModel = `http://${dataBot[index].ip}:3000/api/storage/getKillBotsByModel`;
    const dataM = await axios.post(urlModel, {nameModel})
    if (dataM.data.acctsModelsLength === 0) {
      console.log("No hay killbots en el botcontainer");
      continue;
    }
    if (botsRestatnes > dataM.data.acctsModelsLength) {
      botsRestatnes=botsRestatnes-dataM.data.acctsModelsLength
      let url = `http://${dataBot[index].ip}:3000/api/bot/killbot`;
      const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany, nBots: dataM.data.acctsModelsLength}, process.env.KEY_JWT)
      axios.post(url, {token})
      .then(function (response) {
        if (response.data.message === 'bot killer') {
          console.log(response.data.message);
        }
        let datosBot=dataBot[index]
        datosBot.CompnaysArray[i].AcctsFree=parseInt(datosBot.CompnaysArray[i].AcctsUsed)
        botContainerModels.findOneAndUpdate(
          {_id: dataBot[index]._id},
          { $set: datosBot},
          (err, doc) => {
            if (err) {
              console.log(err);
            }
          }
        )
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if (botsRestatnes <= dataM.data.acctsModelsLength) {
      let url = `http://${dataBot[index].ip}:3000/api/bot/killbot`;
      const token = jwt.sign({nameModel, userId, headquarter: dataModel.headquarters_idHeadquarter, company: dataHeadQ.company_idCompany, nBots: botsRestatnes}, process.env.KEY_JWT)
      axios.post(url, {token})
      .then(function (response) {
        if (response.data.message === 'bot killer') {
          console.log(response.data.message);
        }
        let datosBot=dataBot[index]
        datosBot.CompnaysArray[i].AcctsFree=parseInt(datosBot.CompnaysArray[i].AcctsFree)+parseInt(botsRestatnes)
        botContainerModels.findOneAndUpdate(
          {_id: dataBot[index]._id},
          { $set: datosBot},
          (err, doc) => {
            if (err) {
              console.log(err);
            }
          }
        )
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }



// return  

//   try {
//     const token = jwt.sign({nameModel, userId, nBots}, process.env.KEY_JWT)
//     return res.status(200).send({
//       success: true,
//       message: "Token creado correctamente",
//       token
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: error.message
//     });
//   }
}
module.exports = {signIn, signUp, GetUserByID, GetUser, GetUserByEmail, getMe, deleteUser, updateUser, tokenKillBot, tokenBot, getTypeUserByToken};