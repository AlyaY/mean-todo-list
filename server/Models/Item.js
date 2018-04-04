const mongoose = require('mongoose');  
const ItemSchema = new mongoose.Schema({  
    name: String,
    description: String,
    isDone: {
        type: Boolean,
        default: false
    }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');