const express = require("express");
const ctrlc = require("../controller/userCtrl");
const securityNonce = require("../middlewares/securityNonce");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const router = express.Router();

router.post("/cart/create-order", [authMiddleware], ctrlc.createOrder);

module.exports = router;
