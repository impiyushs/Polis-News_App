const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NewsSchema = new mongoose.Schema({
  url: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  urlToImage: {
    type: String,
    default: false
  },

});

module.exports = mongoose.model('News', NewsSchema);
