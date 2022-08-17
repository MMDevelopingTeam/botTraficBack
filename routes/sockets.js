const express = require("express");
const { sendMessage, getClients, sendMessageForSuperUser, getNotificationsByIdUser, getNotificationsByIdUserState, updateNotifications, sendMessageForUserAdmin } = require("../controllers/sockets");
const router = express.Router();


router.get("/", getClients)
router.post("/sendForSuperUser/:id", sendMessageForSuperUser)
router.post("/sendMessageForUserAdmin/:id", sendMessageForUserAdmin)
router.get("/notifications/:id", getNotificationsByIdUser)
router.get("/AllNotifications/:id", getNotificationsByIdUserState)
router.post("/:id", sendMessage)
router.put("/notifications/:id", updateNotifications)

module.exports = router