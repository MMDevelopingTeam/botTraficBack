const tableLogLaunchModels = require('../models/tableLogLaunch');
const userModels = require('../models/user');

// create register
const createRegister = async (req, res) => {
    const { nameModel, userId, nBots } = req.body;
    const dataU = await userModels.findOne({_id: userId})
    if (!dataU) {
        return res.status(400).send({
            success: false,
            message: "Usuario no encontrado"
        });
    }
    try {
        const newRegister = new tableLogLaunchModels({
            nameModel, userId, nBots
        })
        await newRegister.save()
        return res.status(200).send({
            success: true,
            message: "Registro creado correctamente."
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get registers
const getRegisters = async (req, res) => {
    try {
        const dataRegister = await tableLogLaunchModels.find()
        if (dataRegister) {
            return res.status(200).send({
                success: true,
                message: "Registros traidos correctamente.",
                dataRegister
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id register
const getRegisterByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataPlatfm = await tableLogLaunchModels.findOne({_id: id})
        if (!dataPlatfm) {
            return res.status(400).send({
                success: false,
                message: "Registro no encontrada"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Registro traido correctamente.",
            dataPlatfm
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id user register
const getRegisterByIDUser = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataPlatfm = await tableLogLaunchModels.find({userId: id})
        if (!dataPlatfm) {
            return res.status(400).send({
                success: false,
                message: "Registros no encontrados"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Registros traido correctamente.",
            dataPlatfm
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update register
const updateRegister = async (req, res) => {
    const { nameModel, NBots, user_idUser } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataPlatfm = await tableLogLaunchModels.findOne({_id: id})
        if (!dataPlatfm) {
            return res.status(400).send({
                success: false,
                message: "Registro no encotrado"
            });
        }
        if (nameModel != undefined) {
            dataPlatfm.nameModel=nameModel
        }
        if (NBots != undefined) {
            dataPlatfm.NBots=NBots
        }
        if (user_idUser != undefined) {
            dataPlatfm.user_idUser=user_idUser
        }
        await dataPlatfm.save()
        return res.status(200).send({
            success: true,
            message: "Registro actualizado correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

const deleteRegister = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataPlatfm = await tableLogLaunchModels.findOne({_id: id})
        if (!dataPlatfm) {
            return res.status(400).send({
                success: false,
                message: "Registro no encotrado"
            });
        }
        await tableLogLaunchModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "Registro eliminado correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createRegister, getRegisters, getRegisterByID, updateRegister, getRegisterByIDUser, deleteRegister};