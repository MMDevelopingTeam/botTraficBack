const userTypeModels = require('../models/userType');

// create userType
const createUserType = async (req, res) => {
    const { nameUserType, descriptionUserType } = req.body;
    try {
        const dataUserT = await userTypeModels.findOne({nameUserType})
        if (dataUserT) {
            return res.status(403).send({
                success: false,
                message: "El tipo de usuario ya existe."
            });
        }
        const newUserType = new userTypeModels({
            nameUserType,
            descriptionUserType
        })
        await newUserType.save()
        return res.status(200).send({
            success: true,
            message: "UserType creado correctamente."
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get userType
const getUserType = async (req, res) => {
    try {
        const dataUserT = await userTypeModels.find()
        if (dataUserT) {
            return res.status(200).send({
                success: true,
                message: "UserTypes traidos correctamente.",
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

// get by id userType
const getUserTypeByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "UserTypes no encontrado"
            });
        }
        return res.status(200).send({
            success: true,
            message: "UserType traido correctamente.",
            dataUserT
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update userType
const updateUserType = async (req, res) => {
    const { nameUserType, descriptionUserType } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "userType no encotrado"
            });
        }
        if (nameUserType != undefined) {
            dataUserT.nameUserType=nameUserType
        }
        if (descriptionUserType != undefined) {
            dataUserT.descriptionUserType=descriptionUserType
        }
        await dataUserT.save()
        return res.status(200).send({
            success: true,
            message: "userType actualizado correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

const deleteUserType = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataUserT = await userTypeModels.findOne({_id: id})
        if (!dataUserT) {
            return res.status(400).send({
                success: false,
                message: "userType no encotrado"
            });
        }
        await userTypeModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "userType eliminada correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createUserType, getUserType, getUserTypeByID, updateUserType, deleteUserType};