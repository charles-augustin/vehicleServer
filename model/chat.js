const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatSchema = new schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var chats = mongoose.model('chat', chatSchema);

module.exports = chats;