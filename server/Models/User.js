const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: [true, 'name is missed']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is missed']
    },
    password: {
        type: String,
        required: [true, 'password is missed']
    },
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');