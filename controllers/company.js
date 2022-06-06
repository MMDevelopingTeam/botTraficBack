const companyModels = require('../models/company');
const registerLicensesModels = require('../models/registerLicenses');
const botContainerModels = require('../models/botContainer');
const parseId = require('../utils/parser');

// create company
const createCompany = async (req, res) => {
    let newArrayL=[]
    let newArray=[]
    const { nameCompany, typeCompany, addressCompany, telephoneCompany,  logo, isConfigFull, registerLicensesArray, botContainerArray } = req.body;
    try {
        for (let index = 0; index < registerLicensesArray.length; index++) {
          const dataL = await registerLicensesModels.findOne({_id: registerLicensesArray[index]})
          if (!dataL) {
            return res.status(403).send({
              success: false,
              message: `La licencia_id ${registerLicensesArray[index]} no existe`
            });
          }
          let i = newArrayL.indexOf(registerLicensesArray[index])
          if (i !== -1) {
            return res.status(403).send({
                success: false,
                message: `La licencia_id ${registerLicensesArray[index]} ya existe en el array`
              });
          }
          newArrayL.push(registerLicensesArray[index])
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    try {
        for (let index = 0; index < botContainerArray.length; index++) {
          const dataL = await botContainerModels.findOne({_id: botContainerArray[index]})
          if (!dataL) {
            return res.status(403).send({
              success: false,
              message: `El botContainer_id ${botContainerArray[index]} no existe`
            });
          }
          let i = newArray.indexOf(botContainerArray[index])
          if (i !== -1) {
            return res.status(403).send({
                success: false,
                message: `El botContainer_id ${botContainerArray[index]} ya existe en el array`
              });
          }
          newArray.push(botContainerArray[index])
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    try {
        const dataCompany = await companyModels.findOne({nameCompany})
        if (dataCompany) {
            return res.status(403).send({
                success: false,
                message: "La compañia ya existe."
            });
        }
        // if (botContainerArray.length === 0) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Añade almenos una botContainer."
        //     });
        // }
        const newCompany = new companyModels({
            nameCompany, typeCompany, addressCompany, telephoneCompany, logo, isConfigFull, registerLicensesArray: newArrayL, botContainerArray: newArray
        })
        const newComp = await newCompany.save()
        return res.status(200).send({
            success: true,
            message: "Compañia creado correctamente.",
            newComp
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get companys
const getCompanys = async (req, res) => {
    try {
        const dataCompany = await companyModels.find()
        if (dataCompany) {
            return res.status(200).send({
                success: true,
                message: "Compañias traidas correctamente.",
                dataCompany
            });
        }
        if (dataCompany) {
            return res.status(200).send({
                success: true,
                message: "Compañias traidas correctamente.",
                dataCompany
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id company
const getCompanyByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataCompany = await companyModels.findOne({_id: id}).populate({path: 'registerLicensesArray'})
        if (!dataCompany) {
            return res.status(400).send({
                success: false,
                message: "Compañia no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Compañia traida correctamente.",
            dataCompany
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// update company
const updateCompany = async (req, res) => {
    const { nameCompany, typeCompany, addressCompany, telephoneCompany, logo, isConfigFull, registerLicensesArray, botContainerArray } = req.body;
    const { id } = req.params;
    let newArray=[]
    let newArrayL=[]
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataCompany = await companyModels.findOne({_id: id})
        if (!dataCompany) {
            return res.status(400).send({
                success: false,
                message: "Compañia no encotrada"
            });
        }
        if (nameCompany != undefined) {
            dataCompany.nameCompany=nameCompany
        }
        if (typeCompany != undefined) {
            dataCompany.typeCompany=typeCompany
        }
        if (addressCompany != undefined) {
            dataCompany.addressCompany=addressCompany
        }
        if (telephoneCompany != undefined) {
            dataCompany.telephoneCompany=telephoneCompany
        }
        if (logo != undefined) {
            dataCompany.logo=logo
        }
        if (isConfigFull != undefined) {
            dataCompany.isConfigFull=isConfigFull
        }
        if (registerLicensesArray != undefined) {
            try {
              for (let index = 0; index < registerLicensesArray.length; index++) {
                const dataUserL = await registerLicensesModels.findOne({_id: registerLicensesArray[index]})
                if (!dataUserL) {
                  return res.status(403).send({
                    success: false,
                    message: `La licencia_id ${registerLicensesArray[index]} no existe`
                  });
                }
                dataCompany.registerLicensesArray.map(
                    data => {
                        newArrayL.push(String(data._id))
                    }
                )
                let i = newArrayL.indexOf(registerLicensesArray[index])
                if (i === -1) {
                    dataCompany.registerLicensesArray=dataCompany.registerLicensesArray.concat(registerLicensesArray[index])
                }else{
                    return res.status(403).send({
                        success: false,
                        message: `La licencia ya esta registrada`
                    });
                }
              }
            } catch (error) {
              return res.status(400).send({
                  success: false,
                  message: error.message  
              });
            }
        }
        if (botContainerArray != undefined) {
            try {
              for (let index = 0; index < botContainerArray.length; index++) {
                const dataUserL = await botContainerModels.findOne({_id: botContainerArray[index]})
                if (!dataUserL) {
                  return res.status(403).send({
                    success: false,
                    message: `El botContainer_id ${botContainerArray[index]} no existe`
                  });
                }
                dataCompany.botContainerArray.map(
                    data => {
                        newArray.push(String(data._id))
                    }
                )
                let i = newArray.indexOf(botContainerArray[index])
                if (i === -1) {
                    dataCompany.botContainerArray=dataCompany.botContainerArray.concat(botContainerArray[index])
                }else{
                    return res.status(403).send({
                        success: false,
                        message: `El botContainer ya esta registrada`
                    });
                }
              }
            } catch (error) {
              return res.status(400).send({
                  success: false,
                  message: error.message  
              });
            }
        }
        await dataCompany.save()
        return res.status(200).send({
            success: true,
            message: "Compañia actualizada correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// delete company
const deleteCompany = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataCompany = await companyModels.findOne({_id: id})
        if (!dataCompany) {
            return res.status(400).send({
                success: false,
                message: "Compañia no encotrada"
            });
        }
        await companyModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "Compañia eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createCompany, getCompanys, getCompanyByID, updateCompany, deleteCompany};