const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");
const ctrlUser = require("./src/controllers/ctrlUser");
const ctrlIndex = require("./src/controllers/ctrlIndex");




router.use("/user", ctrlCRUD);
router.use("/requester", ctrlCRUD);

//================================================================
router.use("/", ctrlIndex);
router.use("/user", ctrlUser);


module.exports = router;