const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");
const ctrlUser = require("./src/controllers/ctrlUser");
const ctrlIndex = require("./src/controllers/ctrlIndex");


router.use("/", ctrlIndex);
router.use("/user", ctrlCRUD);
router.use("/user", ctrlUser);
//================================================================
//const ctrlFrontEnd = require("./src/controllers/controllerFront");

// router.use("/application/user", ctrlUser);

module.exports = router;