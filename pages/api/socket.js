import { Server } from "socket.io"

export default function handler(req, res) {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg)
            })

            socket.on('handle-status', (data) => {
                // console.log('data', data)
            })

            socket.on('update-order', (data) => {
                // console.log('update-order', data)
                io.emit('get-order', data)
            })

            socket.on('create-order', (data) => {
                // console.log(data)
                io.emit('get-create-order', data)
            })

        })

    }
    res.end()
}