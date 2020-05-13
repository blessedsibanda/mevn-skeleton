const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
			select: false,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true },
);

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

userSchema.methods.validPassword = async function(candidatePassword) {
	const result = await bcrypt.compare(candidatePassword, this.password);
	return result;
};
module.exports = mongoose.model('User', userSchema);
