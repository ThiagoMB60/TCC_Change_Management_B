const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");
const ctrlUser = require("./src/controllers/ctrlUser");

router.use("/user", ctrlCRUD);
router.use("/user", ctrlUser);

module.exports = router;