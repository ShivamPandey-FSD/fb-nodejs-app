const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fileName: { type: String, required: true },
    contentType: { type: String, required: true },
    image: { type: Buffer, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('File', schema);