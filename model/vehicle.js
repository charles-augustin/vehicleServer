const mongoose = require('mongoose');

const schema = mongoose.Schema;

const vehicleSchema = new schema({
    Type: {
        type: String,
        required: true
    },
    Make: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    PlateNo: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

var vehicles = mongoose.model('vehicle', vehicleSchema);

module.exports = vehicles;

