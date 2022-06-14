const botContainerModels = require('../models/botContainer');
const axios = require('axios');

// create botConatiner
const createBotConatiner = async (req, res) => {
    const { ip, typeBot, descriptionBot, latBot, lonBot, addressBot, averageDownloadSpeed, averageUploadSpeed, isp } = req.body;
    try {
        const dataBotContainer = await botContainerModels.findOne({ip})
        if (dataBotContainer) {
            return res.status(403).send({
                success: false,
                message: "El IP ya existe."
            });
        }
        try {
            let url = `http://${ip}:3000/api/storage/getaccts`;
            const dataA = await axios(url)
            let allACt=dataA.data.acctsModelslength
            const newBotContainer = new botContainerModels({
                ip, typeBot, descriptionBot, latBot, lonBot, addressBot, averageDownloadSpeed, averageUploadSpeed, isp, accountsAll: allACt, accountsFree: allACt
            })
            await newBotContainer.save()
        } catch (error) {
            if (error.code === "ETIMEDOUT") {
                return res.status(400).send({
                    success: false,
                    message: "Inposible conectar al bot por IP"
                });
            }
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
        return res.status(200).send({
            success: true,
            message: "BotContainer creado correctamente."
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
    
}

// get botConatiner
const getBotConatiner = async (req, res) => {
    try {
        const dataBotContainer = await botContainerModels.find()
        if (dataBotContainer) {
            return res.status(200).send({
                success: true,
                message: "BotContainers traidos correctamente.",
                dataBotContainer
            });
        }
        data
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// get by id botConatiner
const getBotConatinerByID = async (req, res) => {
    const { id } = req.params
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataBotContainer = await botContainerModels.findOne({_id: id})
        if (!dataBotContainer) {
            return res.status(400).send({
                success: false,
                message: "BotContainer no encontrado"
            });
        }
        return res.status(200).send({
            success: true,
            message: "BotContainer traido correctamente.",
            dataBotContainer
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
}

// update botConatiner
const updateBotConatiner = async (req, res) => {
    const { ip, typeBot, descriptionBot, latBot, lonBot, addressBot, averageDownloadSpeed, averageUploadSpeed, isp, isActive } = req.body;
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataBotContainer = await botContainerModels.findOne({_id: id})
        if (!dataBotContainer) {
            return res.status(400).send({
                success: false,
                message: "BotContainer no encotrado"
            });
        }
        if (ip != undefined) {
            dataBotContainer.ip=ip
        }
        if (typeBot != undefined) {
            dataBotContainer.typeBot=typeBot
        }
        if (descriptionBot != undefined) {
            dataBotContainer.descriptionBot=descriptionBot
        }
        if (latBot != undefined) {
            dataBotContainer.latBot=latBot
        }
        if (lonBot != undefined) {
            dataBotContainer.lonBot=lonBot
        }
        if (addressBot != undefined) {
            dataBotContainer.addressBot=addressBot
        }
        if (averageDownloadSpeed != undefined) {
            dataBotContainer.averageDownloadSpeed=averageDownloadSpeed
        }
        if (averageUploadSpeed != undefined) {
            dataBotContainer.averageUploadSpeed=averageUploadSpeed
        }
        if (isp != undefined) {
            dataBotContainer.isp=isp
        }
        if (isActive != undefined) {
            dataBotContainer.isActive=isActive
        }
        await dataBotContainer.save()
        return res.status(200).send({
            success: true,
            message: "BotContainer actualizado correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// update botConatiner
const updateBotConatinerByIP = async (req, res) => {
    const { typeBot, descriptionBot, latBot, lonBot, addressBot, averageDownloadSpeed, averageUploadSpeed, isp, isActive } = req.body;
    const { ip } = req.params;
    if (ip === ':ip') {
        return res.status(400).send({
            success: false,
            message: "ip es requerido"
        });
    }
    try {
        const dataBotContainer = await botContainerModels.findOne({ip})
        if (!dataBotContainer) {
            return res.status(400).send({
                success: false,
                message: "BotContainer no encotrado"
            });
        }
        if (typeBot != undefined) {
            dataBotContainer.typeBot=typeBot
        }
        if (descriptionBot != undefined) {
            dataBotContainer.descriptionBot=descriptionBot
        }
        if (latBot != undefined) {
            dataBotContainer.latBot=latBot
        }
        if (lonBot != undefined) {
            dataBotContainer.lonBot=lonBot
        }
        if (addressBot != undefined) {
            dataBotContainer.addressBot=addressBot
        }
        if (averageDownloadSpeed != undefined) {
            dataBotContainer.averageDownloadSpeed=averageDownloadSpeed
        }
        if (averageUploadSpeed != undefined) {
            dataBotContainer.averageUploadSpeed=averageUploadSpeed
        }
        if (isp != undefined) {
            dataBotContainer.isp=isp
        }
        if (isActive != undefined) {
            dataBotContainer.isActive=isActive
        }
        await dataBotContainer.save()
        return res.status(200).send({
            success: true,
            message: "BotContainer actualizado correctamente"
        });

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


const deleteBotConatiner = async (req, res) => {
    const { id } = req.params;
    if (id === ':id') {
        return res.status(400).send({
            success: false,
            message: "id es requerido"
        });
    }
    try {
        const dataBotContainer = await botContainerModels.findOne({_id: id})
        if (!dataBotContainer) {
            return res.status(400).send({
                success: false,
                message: "userType no encotrado"
            });
        }
        await botContainerModels.deleteOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "BotContainer eliminado correctamente"
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}


module.exports = {createBotConatiner, getBotConatiner, getBotConatinerByID, updateBotConatiner, updateBotConatinerByIP, deleteBotConatiner};