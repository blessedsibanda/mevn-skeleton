const { Router } = require('express');
const {
	list,
	getUserById,
	updateUser,
	changePassword,
} = require('../controllers/userController');
const { hasPassword } = require('../middlewares/validations/validators');
const passportJwt = require('../middlewares/passportJwt')();

const router = Router();

router.get('/', list);
router.get('/:id', getUserById);
router.patch('/', passportJwt.authenticate(), updateUser);
router.patch(
	'/change-password',
	passportJwt.authenticate(),
	[ hasPassword ],
	changePassword,
);

module.exports = router;
