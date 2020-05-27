net = require('net')

class Socket {
    sockets = []
    constructor() {
        this.server = net.createServer((socket) => {
            socket.name = socket.remoteAddress+':'+socket.remotePort
            console.log('Connection from',socket.name)
            socket.write('Conectado\n')
            const length = sockets.length;
            socket.index = length;
            sockets.push(socket);
            socket.on('data', (data) => {
                const info = String(data).split('-');
                if (info.length !==  2) {
                  this.sockets.splice(socket.index,1)
                  socket.end();
                } else {
                  socket.code = info[0];
                  socket.player = info[1]
                }
            })
            socket.on('end', () => {
              console.log(socket.name, 'disconnected');
            })
        })
        this.server.listen(8082,'localhost');
        console.log('Socket listening on port 8082')
    }
    finish(blackjack) {
        const socketsToEnd = sockets.filter(({ code }) => code === blackjack._id);
        socketsToEnd.forEach(socket => {
            socket.end();
        });
        this.sockets = this.sockets.filter(({ code, player}) => code !== blackjack._id)
    }
    update(blackjack) {
        const socketsToNotif = sockets.filter(({ code }) => code === blackjack._id);
        socketsToNotif.forEach(socket => {
            socket.write(JSON.Stringify({
                players: blackjack.players,
                house: blackjack.house,
                code: blackjack._id
             }));
        });
    }
    remove(_id,id) {
        this.sockets = this.sockets.filter(({ code, player}) => code !== _id && player !== id)
    }

}

const socket = new Socket();
module.export = socket;