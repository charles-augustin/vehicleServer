const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    licenseNo: {
        type: String,
        required: true,
        unique: true
    },
    lExpiryDate: {
        type: Date,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var clients = mongoose.model('client', clientSchema);

module.exports = clients;