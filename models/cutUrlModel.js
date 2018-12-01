let mongoose = require("mongoose");
let config = require("../config.js");
let shortid = require("shortid");



const cutUrlSchema = new mongoose.Schema({
    cutUrl: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    expiresDate: {
        type: Date,
        default: new Date().addDays(config.settings.expiresDate)
    },
    requestCount: {
        type: Number,
        default: 0
    },
    fullUrl: { type: mongoose.Schema.Types.ObjectId, ref: 'fullUrl' },
});


Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

export default mongoose.model('cutUrl', cutUrlSchema);