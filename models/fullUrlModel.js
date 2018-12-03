let mongoose = require("mongoose");

const fullUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        unique: true,
    },
    cutUrls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cutUrl' }],
});

module.exports = mongoose.model('fullUrl', fullUrlSchema);