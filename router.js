const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");

router.use("/user", ctrlCRUD);

module.exports = router;