const mongoose = require('mongoose');
const schema = mongoose.Schema;

const favoriteSchema = new schema({
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

let favorites = mongoose.model('favorite', favoriteSchema);
module.exports = favorites;