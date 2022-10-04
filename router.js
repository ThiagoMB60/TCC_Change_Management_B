const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/ctrlCRUD");

router.use("/user", ctrlCRUD);

module.exports = router;