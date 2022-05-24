const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatRoom: {
    type: 'String',
    required: [true, 'chatRoom should be there']
  },
  data: []
});

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
