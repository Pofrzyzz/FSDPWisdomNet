// // src/components/Chatbot.js
// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { db } from '../firebaseConfig';
// import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
// import chatbotIcon from '../images/chatbot.svg';

// const socket = io('http://localhost:5000');

// function Chatbot() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [step, setStep] = useState(2); // Always force manual input (reverted to original)
//   const [name, setName] = useState('');
//   const [nric, setNric] = useState('');
//   const [nricError, setNricError] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatId, setChatId] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Since we're reverting, we always force the input form.
//   useEffect(() => {
//     setStep(2);
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     if (chatId) {
//       const messagesRef = query(
//         collection(db, 'chats', chatId, 'messages'),
//         orderBy('timestamp', 'asc')
//       );
//       const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//         const newMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(newMessages);
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       });
//       return () => unsubscribe();
//     }
//   }, [chatId]);

//   const isValidNric = (nric) => /^[STFG]\d{7}[A-Z]$/.test(nric);

//   const startLiveChat = () => {
//     if (!name || !nric) {
//       setStep(2);
//     } else {
//       submitUserInfo();
//     }
//   };

//   const submitUserInfo = async () => {
//     if (!name) {
//       alert("Please enter your name.");
//       return;
//     }
//     if (!isValidNric(nric)) {
//       setNricError("Please enter a valid NRIC (e.g., S1234567A).");
//       return;
//     }
//     setNricError('');
//     setIsLoading(true);

//     const chatRef = await addDoc(collection(db, 'chats'), {
//       name,
//       nric,
//       status: 'active',
//       createdAt: serverTimestamp(),
//     });

//     setChatId(chatRef.id);
//     console.log("✅ Chat session started, chatId:", chatRef.id);
//     setIsLoading(false);
//     setStep(5);

//     socket.emit('startChat', { name, nric, chatId: chatRef.id });

//     socket.on('chatAssigned', (data) => {
//       console.log("📩 Received chatAssigned event:", data);
//     });

//     await addDoc(collection(db, 'chats', chatRef.id, 'messages'), {
//       message: `Hello ${name}, welcome to our live chat! An operator will be with you shortly.`,
//       sender: 'system',
//       timestamp: serverTimestamp(),
//     });
//   };

//   const sendMessage = async () => {
//     if (message.trim() && chatId) {
//       console.log("📤 Sending message:", message, "Chat ID:", chatId);
//       const newMessage = {
//         message,
//         sender: 'user',
//         timestamp: serverTimestamp(),
//       };

//       await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
//       socket.emit('chatMessage', { chatId, message });
//       setMessage('');
//     } else {
//       console.log("⚠️ Message not sent: Missing chatId or empty message.");
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {isChatOpen ? (
//         <div className="bg-white shadow-lg rounded-lg w-96 h-[550px] flex flex-col">
//           {/* Header */}
//           <div className="flex justify-between items-center bg-[#DD101E] text-white p-4 rounded-t-lg">
//             <div className="flex items-center">
//               <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
//               <div>
//                 <h2 className="text-lg font-bold">Live Chat</h2>
//                 <p className="text-sm">An operator will assist you shortly</p>
//               </div>
//             </div>
//             <button className="text-white hover:text-gray-200 text-2xl font-bold" onClick={() => setIsChatOpen(false)}>
//               ×
//             </button>
//           </div>

//           {/* Chat Body */}
//           <div className="p-4 flex-1 overflow-y-auto bg-gray-100">
//             {isLoading ? (
//               <div className="flex items-center justify-center text-gray-700 text-lg font-semibold">
//                 <p>Loading...</p>
//               </div>
//             ) : step === 2 ? (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full p-2 mb-2 border rounded-lg"
//                 />
//                 <input
//                   type="text"
//                   placeholder="NRIC"
//                   value={nric}
//                   onChange={(e) => setNric(e.target.value)}
//                   className="w-full p-2 mb-2 border rounded-lg"
//                 />
//                 {nricError && <p className="text-red-500 text-sm mt-1">{nricError}</p>}
//                 <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={submitUserInfo}>
//                   Start Chat
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-y-scroll h-80 mb-4 hide-scrollbar">
//                   {messages.map((msg, index) => (
//                     <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
//                       <div className={`p-2 rounded-lg max-w-xs text-sm ${msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}>
//                         {msg.message}
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 {/* Message Input */}
//                 <div className="flex items-center p-3 border-t bg-white">
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                   />
//                   <button
//                     onClick={sendMessage}
//                     className="bg-[#DD101E] text-white p-3 rounded-r-lg hover:bg-[#C00E1A] transition-colors"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <button
//           className="bg-[#DA291C] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#C00E1A] flex items-center gap-2 font-semibold"
//           onClick={() => setIsChatOpen(true)}
//         >
//           <img src={chatbotIcon} alt="Chatbot Icon" className="w-5 h-5" />
//           <span className="font-semibold text-base">Need Help?</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default Chatbot;
