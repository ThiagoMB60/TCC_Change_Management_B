const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");
const ctrlUser = require("./src/controllers/ctrlUser");


router.use("/user", ctrlCRUD);
router.use("/user", ctrlUser);
//================================================================
const ctrlFrontEnd = require("./src/controllers/controllerFront");

router.use("/application", ctrlFrontEnd);

module.exports = router;