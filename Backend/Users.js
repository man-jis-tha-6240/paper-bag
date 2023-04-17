const mongoose = require('mongoose');
const UserSchema=mongoose.Schema({
	yourName: {
        type: String,
        required: true,
	},
	email: {
		type: String,
        required: true,
	},
    password: {
        type: String,
        required: true,
	}
})
module.exports=mongoose.model('Users', UserSchema);