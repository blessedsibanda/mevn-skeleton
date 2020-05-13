const User = require('../models/User');
const validationHandler = require('../middlewares/validations/validationHandler');

exports.list = async (req, res, next) => {
	try {
		const users = await User.find().select('-email');
		res.json({ users });
	} catch (e) {
		next(e);
	}
};

exports.getUserById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id).select('-email');
		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}
		res.json({ user });
	} catch (e) {
		next(e);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		let user = await User.findById(req.user.id);

		const name = req.body.name;
		const email = req.body.email;
		if (!name && !email) {
			const error = new Error(
				'name or email address (or both) is required',
			);
			error.statusCode = 400;
			throw error;
		}

		// update name
		if (name) {
			const existingUser = await User.findOne({ name });
			if (existingUser) {
				const error = new Error('Name already taken');
				error.statusCode = 403;
				throw error;
			} else {
				user.name = name;
			}
		}
		// update email
		if (email) {
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				const error = new Error('Email already taken');
				error.statusCode = 403;
				throw error;
			} else {
				user.email = email;
			}
		}

		user = await user.save();

		res.json({ user, message: 'User updated successfully!' });
	} catch (e) {
		next(e);
	}
};

exports.changePassword = async (req, res, next) => {
	try {
		validationHandler(req);
		let user = await User.findById(req.user.id);
		const password = req.body.password;
		user.password = await user.encryptPassword(password);
		user = await user.save();
		res.json({ user, message: 'User password updated successfully!' });
	} catch (e) {
		next(e);
	}
};
