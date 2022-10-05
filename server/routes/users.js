const express = require('express');
const router = express.Router();
const { User } = require("..models/user");
const { auth } = require("../middleware.auth");

router.get("auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: true,
        email: req.user.email
    })
})