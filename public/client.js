const socket = io();

const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');
const pickEmojiButton = document.querySelector('#pick-emoji-button');
const usernameInput = document.querySelector('#username-input');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  const username = usernameInput.value;
  socket.emit('send message', { username, message });
  messageInput.value = '';
});


socket.on('new message', message => {
  const messageList = document.querySelector('#message-list');
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `[${message.timestamp}] ${message.username}: ${message.message}`;
  messageList.appendChild(newMessage);
});
