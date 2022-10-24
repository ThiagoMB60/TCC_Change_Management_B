const express = require("express");
const router = express.Router();

const ctrlCRUD = require("./src/controllers/CRUDctrl");
const ctrlIndex = require("./src/controllers/ctrlIndex");

const ctrlUser = require("./src/controllers/ctrlUser");
const ctrlRequester = require("./src/controllers/ctrlRequester");
const ctrlModule = require("./src/controllers/ctrlModule");




router.use("/user", ctrlCRUD);
router.use("/requester", ctrlCRUD);
router.use("/module", ctrlCRUD);
router.use("/versions", ctrlCRUD);
router.use("/version", ctrlCRUD);

//================================================================
router.use("/", ctrlIndex);
router.use("/user", ctrlUser);
router.use("/requester", ctrlRequester);
router.use("/module", ctrlModule);


module.exports = router;