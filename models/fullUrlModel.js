let mongoose = require("mongoose");

const fullUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        unique: true,
    },
    cutUrls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cutUrl' }],
});

export default mongoose.model('fullUrl', fullUrlSchema);