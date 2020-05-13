const { Router } = require('express');
const {
	list,
	getUserById,
	updateUser,
	changePassword,
	deleteUser,
} = require('../controllers/userController');
const { hasPassword } = require('../middlewares/validations/validators');
const passportJwt = require('../middlewares/passportJwt')();

const router = Router();

router.get('/', passportJwt.authenticate(), list);
router.get('/:id', getUserById);
router.patch('/', passportJwt.authenticate(), updateUser);
router.delete('/', passportJwt.authenticate(), deleteUser);
router.patch(
	'/change-password',
	passportJwt.authenticate(),
	[ hasPassword ],
	changePassword,
);

module.exports = router;
