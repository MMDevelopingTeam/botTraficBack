const userTypeHasPerModels = require('../models/userType_has_permmissions');
const userTypeModels = require('../models/userType');
const permissionsModels = require('../models/permissions');

// create UserTypeHasP
const createUserTypeHasP = async (req, res) => {
    const { permissions_idPermissions, userType_idUserType } = req.body;
    try {
        const dataPermissions = await permissionsModels.findOne({_id: permissions_idPermissions})
        if (!dataPermissions) {
            return res.status(200).send({
                success: true,
                message: "permiso no encontrado"
            });
        }
        const dataUserT = await userTypeModels.findOne({_id: userType_idUserType})
        if (!dataUserT) {
            return res.status(200).send({
                success: true,
                message: "Tipo de usuario no encontrado"
            });
        }
        const newUserTypeHasP = new userTypeHasPerModels({
            permissions_idPermissions, userType_idUserType
        })
        await newUserTypeHasP.save()
        return res.status(200).send({
            success: true,
            message: "UserTypeHasP creado correctamente."
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get UserTypeHasP
const getUserTypeHasP = async (req, res) => {
    try {
        const dataUserT = await userTypeHasPerModels.find()
        if (dataUserT) {
            return res.status(200).send({
                success: true,
                message: "UserTypeHasP traidos correctamente.",
                dataUserT
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id UserTypeHasP
const getUserTypeHasPByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeHasPerModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "UserTypeHasP no encontrado"
            });
        }
        return res.status(200).send({
            success: true,
            message: "UserTypeHasP traido correctamente.",
            dataUserT
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update UserTypeHasP
const updateUserTypeHasP = async (req, res) => {
    const { permissions_idPermissions, userType_idUserType } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeHasPerModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "UserTypeHasP no encotrado"
            });
        }
        if (permissions_idPermissions != undefined) {
            dataUserT.permissions_idPermissions=permissions_idPermissions
        }
        if (userType_idUserType != undefined) {
            dataUserT.userType_idUserType=userType_idUserType
        }
        await dataUserT.save()
        return res.status(200).send({
            success: true,
            message: "UserTypeHasP actualizado correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

const deleteUserTypeHasP = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeHasPerModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "UserTypeHasP no encotrado"
            });
        }
        await userTypeHasPerModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "UserTypeHasP eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createUserTypeHasP, getUserTypeHasP, getUserTypeHasPByID, updateUserTypeHasP, deleteUserTypeHasP};