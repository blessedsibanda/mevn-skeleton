const { body } = require('express-validator');

exports.hasValidEmail = body('email')
	.isEmail()
	.withMessage('Valid email is required');

exports.hasName = body('name')
	.isLength({ min: 3 })
	.withMessage('Name is required. Min length is 3 characters');

exports.hasPassword = body('password')
	.isLength({ min: 6 })
	.withMessage('Password is required. Min length is 6 characters');
