const modelModels = require('../models/models');
const headquartersModels = require('../models/headquarters');

// create model
const createModel = async (req, res) => {
    const { nickname, platform, isAllowed, isActive, headquarters_idHeadquarter } = req.body;
    try {
        const dataModel = await modelModels.findOne({nickname})
        if (dataModel) {
            return res.status(403).send({
                success: false,
                message: "La modelo ya existe"
            });
        }
        const dataHeadquarters = await headquartersModels.findOne({headquarters_idHeadquarter})
        if (!dataHeadquarters) {
            return res.status(403).send({
                success: false,
                message: "Sede no encontrada"
            });
        }
        const newModel = new modelModels({
            nickname, 
            platform, 
            isAllowed, 
            isActive, 
            headquarters_idHeadquarter
        })
        await newModel.save()
        return res.status(200).send({
            success: true,
            message: "Modelo creada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get models
const getModel = async (req, res) => {
    try {
        const dataModel = await modelModels.find()
        if (dataModel) {
            return res.status(200).send({
                success: true,
                message: "Modelos traidas correctamente",
                dataModel
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id model
const getModelByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataModel = await modelModels.findOne({_id: id})
        if (!dataModel) {
            return res.status(400).send({
                success: false,
                message: "modelo no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "modelo traida correctamente.",
            dataModel
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}
// get by id headQ model
const getModelByIDheadQ = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataModel = await modelModels.find({headquarters_idHeadquarter: id})
        if (!dataModel) {
            return res.status(400).send({
                success: false,
                message: "modelo no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "modelos traidas correctamente.",
            dataModel
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update model
const updateModel = async (req, res) => {
    const { nickname, platform, isAllowed, isActive, headquarters_idHeadquarter } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataModel = await modelModels.findOne({_id: id})
        if (!dataModel) {
            return res.status(400).send({
                success: false,
                message: "modelo no encotrada"
            });
        }
        if (nickname != undefined) {
            dataModel.nickname=nickname
        }
        if (platform != undefined) {
            dataModel.platform=platform
        }
        if (isAllowed != undefined) {
            dataModel.isAllowed=isAllowed
        }
        if (isActive != undefined) {
            dataModel.isActive=isActive
        }
        if (headquarters_idHeadquarter != undefined) {
            dataModel.headquarters_idHeadquarter=headquarters_idHeadquarter
        }
        await dataModel.save()
        return res.status(200).send({
            success: true,
            message: "modelo actualizada correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}
// delete model
const deleteModel = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataModel = await modelModels.findOne({_id: id})
        if (!dataModel) {
            return res.status(400).send({
                success: false,
                message: "modelo no encotrada"
            });
        }
        await modelModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "modelo eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createModel, getModel, getModelByID, getModelByIDheadQ, updateModel, deleteModel};