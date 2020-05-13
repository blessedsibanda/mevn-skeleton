const { Router } = require('express');
const { signin, signup, me } = require('../controllers/authController');
const {
	hasName,
	hasValidEmail,
	hasPassword,
} = require('../middlewares/validations/validators');

const passportJwt = require('../middlewares/passportJwt')();

const router = Router();

router.post('/signin', [ hasValidEmail, hasPassword ], signin);
router.post('/signup', [ hasName, hasValidEmail, hasPassword ], signup);
router.get('/me', passportJwt.authenticate(), me);

module.exports = router;
