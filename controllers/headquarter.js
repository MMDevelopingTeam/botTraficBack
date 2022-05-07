const headquarterModels = require('../models/headquarters');
const companyModels = require('../models/company');
const botContainerModels = require('../models/botContainer');

// create headquarter
const createHeadquarter = async (req, res) => {
    const { location, company_idCompany, botsContainer_idBot } = req.body;
    try {
        const dataCompany = await companyModels.findOne({_id: company_idCompany})
        if (!dataCompany) {
            return res.status(403).send({
                success: false,
                message: "Compañia no encontrada"
            });
        }
        const databotContainer = await botContainerModels.findOne({_id: botsContainer_idBot})
        if (!databotContainer) {
            return res.status(403).send({
                success: false,
                message: "botContainer no encontrado"
            });
        }
        const newHeadquarter = new headquarterModels({
            location, company_idCompany, botsContainer_idBot
        })
        await newHeadquarter.save()
        return res.status(200).send({
            success: true,
            message: "Sede creada correctamente."
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get headquarters
const getheadquarters = async (req, res) => {
    try {
        const dataHeadquarter = await headquarterModels.find()
        if (dataHeadquarter) {
            return res.status(200).send({
                success: true,
                message: "Sedes traidas correctamente.",
                dataHeadquarter
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id headquarter
const getheadquarterByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataHeadquarter = await headquarterModels.findOne({_id: id})
        if (!dataHeadquarter) {
            return res.status(400).send({
                success: false,
                message: "Sede no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Sede traida correctamente.",
            dataHeadquarter
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update headquarter
const updateHeadquarter = async (req, res) => {
    const { location, company_idCompany, botsContainer_idBot } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataHeadquarter = await headquarterModels.findOne({_id: id})
        if (!dataHeadquarter) {
            return res.status(400).send({
                success: false,
                message: "Sede no encotrada"
            });
        }
        if (location != undefined) {
            dataHeadquarter.location=location
        }
        if (company_idCompany != undefined) {
            const dataCompany = await companyModels.findOne({_id: company_idCompany})
            if (!dataCompany) {
                return res.status(400).send({
                    success: false,
                    message: "Compañia no encotrada"
                });
            }
            dataHeadquarter.company_idCompany=company_idCompany
        }
        if (botsContainer_idBot != undefined) {
            const databotContainer = await botContainerModels.findOne({_id: botsContainer_idBot})
            if (!databotContainer) {
                return res.status(400).send({
                    success: false,
                    message: "BotsContainer no encotrado"
                });
            }
            dataHeadquarter.botsContainer_idBot=botsContainer_idBot
        }
        await dataHeadquarter.save()
        return res.status(200).send({
            success: true,
            message: "Sede actualizada correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

const deleteHeadquarter = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataHeadquarter = await headquarterModels.findOne({_id: id})
        if (!dataHeadquarter) {
            return res.status(400).send({
                success: false,
                message: "Sede no encotrada"
            });
        }
        await headquarterModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "Sede eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createHeadquarter, getheadquarters, getheadquarterByID, updateHeadquarter, deleteHeadquarter};