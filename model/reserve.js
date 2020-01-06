const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reserveSchema = new schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

var reservation = mongoose.model('reserve', reserveSchema);
module.exports = reservation;