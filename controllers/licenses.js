const licencesModels = require('../models/licenses');

// create license
const createLicense = async (req, res) => {
    const { nameLicense, descriptionLicense } = req.body;
    try {
        const datalicense = await licencesModels.findOne({nameLicense})
        if (datalicense) {
            return res.status(403).send({
                success: false,
                message: "La licencia ya existe"
            });
        }
        
        const newLicense = new licencesModels({
            nameLicense, 
            descriptionLicense
        })
        await newLicense.save()
        return res.status(200).send({
            success: true,
            message: "licencia creada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get licenses
const getLicenses = async (req, res) => {
    try {
        const dataLicenses = await licencesModels.find()
        if (dataLicenses) {
            return res.status(200).send({
                success: true,
                message: "licencias traidas correctamente",
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

// get by id license
const getLicenseByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await licencesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "licencia no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "licencia traida correctamente.",
            dataLicense
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update license
const updateLicense = async (req, res) => {
    const { nameLicense, descriptionLicense } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await licencesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "licencia no encotrada"
            });
        }
        if (nameLicense != undefined) {
            dataLicense.nameLicense=nameLicense
        }
        if (descriptionLicense != undefined) {
            dataLicense.descriptionLicense=descriptionLicense
        }
        await dataLicense.save()
        return res.status(200).send({
            success: true,
            message: "licencia actualizada correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}
// delete license
const deleteLicense = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataLicense = await licencesModels.findOne({_id: id})
        if (!dataLicense) {
            return res.status(400).send({
                success: false,
                message: "licencia no encotrada"
            });
        }
        await licencesModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "licencia eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createLicense, getLicenses, getLicenseByID, updateLicense, deleteLicense};