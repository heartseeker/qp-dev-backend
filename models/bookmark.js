const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    data: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);