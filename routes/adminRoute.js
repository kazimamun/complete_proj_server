const router = require('express').Router();
const {adminByEmail} = require('../controllers/adminController');

router.get('/:email',adminByEmail)

module.exports = router;