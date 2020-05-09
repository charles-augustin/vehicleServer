const mongoose = require('mongoose');
const schema = mongoose.Schema;

const favoriteSchema = new schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

let favorites = mongoose.model('favorite', favoriteSchema);
module.exports = favorites;