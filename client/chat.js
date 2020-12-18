const socket = io();

const chat       = document.querySelector('.chat')
const chatInput  = document.querySelector('.chat__form-input')
const chatOutput = document.querySelector('.chat__output')


const name = prompt("What's your name?")
socket.emit('new-user', name)

function chatAppend(data) {
    const div = document.createElement('div')
    div.innerText = data
    chatOutput.append(div)
    chatInput.focus()
}

socket.on('user-connected', name => {
    chatAppend(`👋 ${name} connected`)
})

socket.on('user-disconnected', name => {
    chatAppend(`😥 ${name} disconnected`)
})

socket.on('chat-msg', data => {
    chatAppend(`${data.time} ${data.name}: ${data.message}`)
})

chat.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat', chatInput.value)
    chatInput.value = ''
})