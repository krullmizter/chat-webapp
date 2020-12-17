const socket = io();

const chat       = document.querySelector('.chat')
const chatInput  = document.querySelector('.chat__input')
const chatOutput = document.querySelector('.chat__output')

chat.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat', chatInput.value)
    chatInput.value = ''
})

const output = (message) => {
    const div = document.createElement('div')
    div.classList.add('chat__msg')

    /*if (id === socket.id) {
        div.classList.add('chat__msg--usr')
    }*/
    
    div.innerText = message
    chatOutput.appendChild(div)
}

socket.on('chat', message => {
    output(message)
    console.log('From server: ', message)
})