const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');
const validationHandler = require('../middlewares/validations/validationHandler');

exports.signup = async (req, res, next) => {
	try {
		validationHandler(req);
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error('Email already used');
			error.statusCode = 403;
			throw error;
		}
		let user = new User({ name, email });
		user.password = await user.encryptPassword(password);
		user = await user.save();

		const token = jwt.encode({ id: user._id }, config.jwtSecret);
		await res
			.status(201)
			.json({ token, user, message: 'Successfully signed up!' });
	} catch (e) {
		next(e);
	}
};

exports.signin = async (req, res, next) => {
	try {
		validationHandler(req);
		const { email, password } = req.body;

		// password is not selected by default so include it
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			const error = new Error('Wrong credentials');
			error.statusCode = 401;
			throw error;
		}
		const validPassword = await user.validPassword(password);
		if (!validPassword) {
			const error = new Error('Wrong credentials');
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.encode({ id: user._id }, config.jwtSecret);
		await res.json({ token, user });
	} catch (e) {
		next(e);
	}
};

exports.me = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		await res.json({ user });
	} catch (e) {
		next(e);
	}
};
