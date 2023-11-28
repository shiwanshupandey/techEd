const mongoose = require('mongoose');

const talkSchema = new mongoose.Schema({
    
  name: {
    type: String
  },
  Email: {
    type: String
  },
  message: {
    type:String
  }
});

module.exports = mongoose.model('Talk', talkSchema);


