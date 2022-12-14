const express = require('express');
const { signup,login, verifyToken } = require('../controllers/user-controller');

const router=express.Router()  //express has the function named "Router"

router.post('/signup',signup)
router.post('/login',login)
router.get('/user',verifyToken)

module.exports=router;