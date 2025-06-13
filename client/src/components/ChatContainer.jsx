import React, { useState, useEffect, useRef, useContext } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../context/chatContext';
import { AuthContext } from '../context/AuthContext';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      console.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full relative backdrop-blur-lg'>
      {/* Header */}
      <div className='flex items-center gap-3 py-3 px-4 border-b border-stone-500 bg-black/30 z-10'>
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className='w-8 rounded-full'
        />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className='md:hidden w-6 cursor-pointer'
        />
        <img src={assets.help_icon} alt="" className='max-md:hidden w-5' />
      </div>

      {/* Chat Area */}
      <div className='absolute inset-0 top-[60px] bottom-[72px] overflow-y-auto p-3 pb-16'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col items-end ${
              msg.senderId === authUser._id ? 'items-end' : 'items-start'
            } mb-4`}
          >
            <div
              className={`flex items-end gap-2 max-w-[75%] ${
                msg.senderId === authUser._id ? 'ml-auto justify-end' : 'mr-auto justify-start'
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className={`max-w-[230px] border border-gray-700 rounded-lg overflow-hidden ${
                    msg.senderId === authUser._id ? 'ml-auto' : 'mr-auto'
                  }`}
                />
              ) : (
                <p
                  className={`p-2 md:text-sm font-light rounded-lg break-words text-white ${
                    msg.senderId === authUser._id
                      ? 'bg-violet-500/30 rounded-br-none ml-auto'
                      : 'bg-white/10 rounded-bl-none mr-auto'
                  }`}
                >
                  {msg.text}
                </p>
              )}
            </div>
            <div
              className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${
                msg.senderId === authUser._id ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className='w-5 h-5 rounded-full'
              />
              <span>{formatMessageTime(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Bar */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/30 backdrop-blur-lg'>
        <div className='flex-1 flex items-center bg-gray-100/10 px-3 rounded-full'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage(e) : null}
            type="text"
            placeholder='Send a message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent'
          />
          <input
            onChange={handleSendImage}
            type="file"
            id='image'
            accept='image/png,image/jpeg'
            hidden
          />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send"
          className='w-5 mr-2 cursor-pointer'
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full'>
      <img src={assets.logo_icon} className='max-w-16' alt="Logo" />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
