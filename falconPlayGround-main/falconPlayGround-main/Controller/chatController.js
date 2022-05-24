const Chat = require('../Model/chatModel');

exports.chatRoomConnect = async room => {
  try {
    const chatData = await Chat.findOne({ chatRoom: room });
    if (!chatData) {
      const newChat = await Chat.create({ chatRoom: room });
      console.log('chatCreated');
    } else {
      console.log('chat present');
      return chatData;
    }
  } catch (err) {
    console.log('error from chatRoomData', err.message);
  }
};

exports.chatUpdate = async data => {
  try {
    const chat = await Chat.findOne({ chatRoom: data.chatRoom });
    chat.data.push({ name: data.userName, message: data.message });
    chat.save();
    console.log(chat);
    return chat;
  } catch (err) {
    console.log(err.message, 'error from chatUpdate');
  }
};
