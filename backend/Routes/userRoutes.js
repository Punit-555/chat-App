
const express = require('express');
const { registerUser,allUsers,  authUser } = require('../controllers/userController');
const{protect} = require('../middlewares/authMiddleware');

const router = express.Router();


// /api/user/login
router.route('/').post(registerUser).get(protect , allUsers);
router.route('/login').post(authUser);   

module.exports   = router; 
