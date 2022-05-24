// import React from 'react';
// import styles from './chat.module.css';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000');
// socket.on('connect', () => {
//   console.log('we are connected', socket.id);
// });

// const name = prompt('Enter Your Name');
// const Socket = () => {
//   const [chatArr, setChatArr] = React.useState([]);
//   const [msg, setMsg] = React.useState('');
//   const [room, setRoom] = React.useState('');
//   const [joinedRoom, setJoinedRoom] = React.useState([]);
//   const rm = React.useRef();
//   React.useEffect(async () => {}, []);
//   const onChangeMessage = e => {
//     setMsg(e.target.value);
//   };
//   const onChangeRoom = e => {
//     setRoom(e.target.value);
//   };

//   const onClickMsgSend = e => {
//     e.preventDefault();
//     if (msg.trim().length !== 0) {
//       let sendMsg = msg.trim();
//       socket.emit('send', { userName: name, message: sendMsg, chatRoom: room });
//       setChatArr([...chatArr, { name: name, message: sendMsg }]);
//     }
//     console.log('working');
//     setMsg('');
//   };
//   const onClickRoomSend = e => {
//     e.preventDefault();
//     setChatArr([]);
//     socket.emit('connect-with-db', { chatRoom: room });
//     rm.current.value = '';
//   };
//   React.useEffect(() => {
//     socket.on('create', data => {
//       if (data) {
//         setChatArr([...data.data]);
//       }
//     });
//     socket.on('send-data', data => {
//       console.log(data);
//       setChatArr([...data.data]);
//     });
//   });
//   return (
//     <div className={styles.webSocket}>
//       <div>
//         <h1>Joined Room</h1>
//       </div>
//       <div className={styles.chat}>
//         <h1>Chat App</h1>
//         <hr />
//         <div />
//         {chatArr.map((ele, index) => {
//           return (
//             <div key={index}>
//               <p style={{ display: 'inline', color: 'black' }}>{ele.name} : </p>
//               <p style={{ display: 'inline' }}>{ele.message}</p>
//             </div>
//           );
//         })}
//       </div>
//       <input type="text" value={msg} className={styles.message} placeholder="Message" onChange={onChangeMessage} />
//       <button className={styles.send} onClick={onClickMsgSend}>
//         Send
//       </button>
//       <input type="text" ref={rm} className={styles.message} placeholder="Room" onChange={onChangeRoom} />
//       <button className={styles.send} onClick={onClickRoomSend}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default Socket;
