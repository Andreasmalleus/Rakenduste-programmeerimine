const express = require('express');
const router = express.Router();

const itemRouter = require('./item.router.js');
const userRouter = require('./user.router.js');
const authRouter = require('./auth.router.js');

router.use("/api/v1/auth",authRouter);
router.use("/api/v1/",userRouter);
router.use("/api/v1/",itemRouter);


module.exports = router;