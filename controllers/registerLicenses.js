const licencesModels = require('../models/licenses');
const companyModels = require('../models/company');
const registerLicensesModels = require('../models/registerLicenses');

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


module.exports = {createRegisterLicense, getRegisterLicenses, getRegisterLicensesByIDLicense, getRegisterLicensesByIDCompany, getRegisterLicenseByID, updateRegisterLicense, deleteRegisterLicense};