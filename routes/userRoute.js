const router = require('express').Router();
const {register, login, allUsers} = require('../controllers/userController');


router.post('/register', register);
router.post('/login', login);
router.get('/allUsers',allUsers)


module.exports = router;