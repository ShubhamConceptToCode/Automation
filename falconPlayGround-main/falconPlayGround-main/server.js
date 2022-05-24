const dotenv = require('dotenv');
dotenv.config();
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

const https = require('https');
const fs = require('fs');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const signatureRouter = require('./Router/signatureRouter.js');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Router/userRouter.js');
const getRouter = require('./Router/getRouter.js');
const paymentRouter = require('./Router/paymentRouter.js');
const app = express();
const chatController = require('./Controller/chatController');
const subscriberRouter = require('./Router/subscriberRouter');
const getDataRouter = require('./Router/getDataRouter');
const scrappingController = require('./Controller/scrappingController');
// const io = require('socket.io')(5000, {
//   cors: {
//     origin: '*'
//   }
// });

// io.on('connection', socket => {
//   console.log('listening socket on 5000', socket.id);
//   socket.on('connect-with-db', async room => {
//     socket.join(room.chatRoom);
//     console.log(room.chatRoom);
//     const data = await chatController.chatRoomConnect(room.chatRoom);
//     socket.emit('create', data);
//   });
//   socket.on('send', async data => {
//     const newChat = await chatController.chatUpdate(data);
//     console.log('send is came', data);
//     socket.in(data.chatRoom).emit('send-data', newChat);
//   });
// });

//  mongoose
//   .connect(DB, { useNewUrlParser: true })
//   .then(() => console.log('finally we are connected'))
//   .catch(err => console.log(err.message));
  app.use(express.json({ limit: "20mb" }));
  app.use(compression());
  app.disable('x-powered-by');
  app.use(cors()); 
  
app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static('falcon-react-v2.10.1/build'));
// need to declare a "catch all" route on your express server
// that captures all page requests and directs them to the client
// the react-router do the route part
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded);
// app.use(cors());

// /api (all api stats with)
// app.use('/', signatureRouter);
app.post('/data', scrappingController);
app.use('/api/data', getRouter);
app.use('/User', userRouter);
app.use('/payment', paymentRouter);
app.use('/subscriber', subscriberRouter);
app.use('/getData', getDataRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

var options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem'),
};

// var server = https.createServer(options, app).listen(8000, function(){
// console.log("Express server listening on port " + 8000);
// });

app.listen(8000, function() {
  console.log(`Frontend start on http://localhost:8000`);
});


