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
}

socket.on('user-connected', name => {
    chatAppend(`👋 ${name} connected`)
})

socket.on('user-disconnected', name => {
    if (name !== null) {
        chatAppend(`😥 ${name} disconnected`)
    }
})

chat.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat-send', chatInput.value)
    chatInput.value = ''
})

socket.on('chat-msg', data => {
    var date = new Date();
    var time = date.getHours() + ':' + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()) + ':' + date.getSeconds();
    chatAppend(`${time} ${data.name}: ${data.message}`)
})

