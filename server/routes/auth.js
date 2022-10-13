const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/auth");

router.post("/api/user/login", loginUser);

module.exports = router;