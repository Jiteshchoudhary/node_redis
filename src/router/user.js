const express = require('express');
const router = express.Router();
const controller = require('../controller');
const { UserController } = controller;

router.get('/', UserController.getUser);
router.post('/', UserController.addUser);

module.exports = router;