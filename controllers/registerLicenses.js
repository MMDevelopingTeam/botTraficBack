const licencesModels = require('../models/licenses');
const companyModels = require('../models/company');
const registerLicensesModels = require('../models/registerLicenses');
const botContainerCompanysModels = require('../models/botContainerCompanys');
const botContainerModels = require('../models/botContainer');

// create RegisterLicense
const createRegisterLicense = async (req, res) => {
    const { initialDateLicense, monthsDuration, licenses_idLicense, companys_idCompany } = req.body;

    var currentDateInitial = new Date(initialDateLicense);
    var currentDateFinished = new Date(initialDateLicense);
    try {
        const datalicense = await licencesModels.findOne({_id: licenses_idLicense})
        if (!datalicense) {
            return res.status(403).send({
                success: false,
                message: "Licencia no encontrada"
            });
        }
        const dataC = await companyModels.findOne({_id: companys_idCompany})
        if (!dataC) {
            return res.status(403).send({
                success: false,
                message: "Compañia no encontrada"
            });
        }
        console.log(monthsDuration);
        currentDateFinished.setMonth(currentDateFinished.getMonth()+parseInt(monthsDuration))
        console.log(currentDateInitial);
        console.log(currentDateFinished);
        const newLicense = new registerLicensesModels({
            initialDateLicense: currentDateInitial, 
            finishedDateLicense: currentDateFinished,
            monthsDuration,
            licenses_idLicense,
            companys_idCompany
        })
        const licence = await newLicense.save()
        dataC.registerLicensesArray=dataC.registerLicensesArray.concat(licence._id)
        await dataC.save()

        const dataBotContainers = await botContainerModels.find()

        let acctRest=datalicense.numberAccts

        for (let index = 0; index < dataBotContainers.length; index++) {
            if (dataBotContainers[index].accountsFree === 0) {
                continue
            }
            if (dataBotContainers[index].accountsFree > acctRest) {
                const dataB = await botContainerModels.findOne({_id:dataBotContainers[index]._id})
                const newRegister = new botContainerCompanysModels({
                    companys_idCompany: companys_idCompany,
                    botContainer_idBotContainer: dataB._id,
                    registerLicenses: licence._id,
                    AcctsUsed: parseInt(acctRest),
                    AcctsFree: parseInt(acctRest)
                })
                const saveRegister = await newRegister.save()
                dataB.CompanysArray=dataB.CompanysArray.concat(saveRegister._id)
                dataB.accountsFree=dataBotContainers[index].accountsFree-acctRest
                await dataB.save()
                break;
            }
            if (dataBotContainers[index].accountsFree < acctRest) {
                acctRest=acctRest-dataBotContainers[index].accountsFree
                const dataB = await botContainerModels.findOne({_id:dataBotContainers[index]._id})
                const newRegisterD = new botContainerCompanysModels({
                    companys_idCompany: newComp._id,
                    botContainer_idBotContainer: dataB._id,
                    registerLicenses: dataReg._id,
                    AcctsUsed: parseInt(dataBotContainers[index].accountsFree),
                    AcctsFree: parseInt(dataBotContainers[index].accountsFree)
                })
                const saveRegisterD = await newRegisterD.save()
                dataB.CompanysArray=dataB.CompanysArray.concat(saveRegisterD._id)
                dataB.accountsFree=0
                await dataB.save()
            }
        }

        return res.status(200).send({
            success: true,
            message: "registro de licencia creada correctamente",
            licence
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get RegisterLicenses
const getRegisterLicenses = async (req, res) => {
    try {
        const dataLicenses = await registerLicensesModels.find()
        if (dataLicenses) {
            return res.status(200).send({
                success: true,
                message: "registro de licencia traidas correctamente",
                dataLicenses
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get RegisterLicenses by id licenses
const getRegisterLicensesByIDLicense = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicenses = await registerLicensesModels.find({licenses_idLicense :id})
        if (dataLicenses) {
            return res.status(200).send({
                success: true,
                message: "registro de licencia traidas correctamente",
                dataLicenses
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get RegisterLicenses by id company
const getRegisterLicensesByIDCompany = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicenses = await registerLicensesModels.find({companys_idCompany: id})
        if (dataLicenses) {
            return res.status(200).send({
                success: true,
                message: "registro de licencia traidas correctamente",
                dataLicenses
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get RegisterLicenses by id company and id platform
const getRegisterLicensesByIDCompanyAndPlat = async (req, res) => {
    const { id } = req.params
    const { platform_idPlatform } = req.body
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    if (!platform_idPlatform) {
        return res.status(400).send({
            success: false,
            message: "platform_idPlatform es requerido"
        });
    }
    try {
        const dataLicenses = await registerLicensesModels.find({companys_idCompany: id})
        if (dataLicenses) {
            let dataLicensesArray = []
            console.log(dataLicenses);
            dataLicenses.map(data => {
                if (String(data.licenses_idLicense.platform_idPlatform._id) === String(platform_idPlatform)) {
                    dataLicensesArray.push(data.licenses_idLicense)
                    // let i = dataLicensesArray.indexOf(data.licenses_idLicense)
                    // if (i === -1) {
                    // }
                }
            })
            return res.status(200).send({
                success: true,
                message: "registro de licencia traidas correctamente",
                dataLicensesArray
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id RegisterLicense
const getRegisterLicenseByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await registerLicensesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "registro no encontrado"
            });
        }
        return res.status(200).send({
            success: true,
            message: "registro de licencia traida correctamente",
            dataLicense
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update RegisterLicense
const updateRegisterLicense = async (req, res) => {
    // const { nameLicense, descriptionLicense } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await registerLicensesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "registro no encotrado"
            });
        }
        await dataLicense.save()
        return res.status(200).send({
            success: true,
            message: "registro de licencia actualizada correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}
// delete RegisterLicense
const deleteRegisterLicense = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await registerLicensesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "registro no encontrado"
            });
        }
        await licencesModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "registro de licencia eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// get licences of company by plaform
const getLicencesCompanyPlatform = async (req, res) => {
    const { companys_idCompany, platforms_idPlatform } = req.body;
    let licencesArray = []
    try {
        const dataLicense = await registerLicensesModels.find({companys_idCompany})
        if (dataLicense) {
            dataLicense.map(data => {
                let i = licencesArray.indexOf(data)
                if (i === -1) {
                    if (String(data.licenses_idLicense.platform_idPlatform._id) === String(platforms_idPlatform)) {
                        licencesArray.push(data)
                    }
                }
            })
        }
        return res.status(200).send({
            success: true,
            message: "licencias traidas correctamente",
            licencesArray
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }

}

module.exports = {createRegisterLicense, getRegisterLicenses, getRegisterLicensesByIDLicense, getLicencesCompanyPlatform, getRegisterLicensesByIDCompany, getRegisterLicensesByIDCompanyAndPlat, getRegisterLicenseByID, updateRegisterLicense, deleteRegisterLicense};