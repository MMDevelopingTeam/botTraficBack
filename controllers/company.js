const companyModels = require('../models/company');
const licensesModels = require('../models/licenses');

// create company
const createCompany = async (req, res) => {
    const { nameCompany, licenses_idLicenses } = req.body;
    try {
        const dataCompany = await companyModels.findOne({nameCompany})
        if (dataCompany) {
            return res.status(403).send({
                success: false,
                message: "La compañia ya existe."
            });
        }
        const datalicense = await licensesModels.findOne({_id: licenses_idLicenses})
        if (!datalicense) {
            return res.status(403).send({
                success: false,
                message: "La licencia no existe"
            });
        }
        const newCompany = new companyModels({
            nameCompany,
            licenses_idLicenses
        })
        await newCompany.save()
        return res.status(200).send({
            success: true,
            message: "Compañia creado correctamente."
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
        const dataCompany = await companyModels.findOne({_id: id})
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
    const { nameCompany, licenses_idLicenses } = req.body;
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
        if (nameCompany != undefined) {
            dataCompany.nameCompany=nameCompany
        }
        if (licenses_idLicenses != undefined) {
            dataCompany.licenses_idLicenses=licenses_idLicenses
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