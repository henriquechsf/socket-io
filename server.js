const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// rota retornando arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// callback que monitora quando usuario conecta
io.on('connection', (socket) => {
    console.log('new connection', socket.id)

    // evento emitido quando receber msg do cliente
    socket.on('msg', (msg) => {
        console.log(msg)
        socket.broadcast.emit('msg', msg);
    })
})

http.listen(3000, () => {
    console.log('Listening on port 3000')
})