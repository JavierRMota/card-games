
class BlackJackSocket {
    sockets = []
    constructor() {
        this.server = require('http').createServer();
        this.io = require('socket.io')(this.server);
        this.io.on('connection', client => {
            client.index = this.sockets.length;
            this.sockets.push(client);
            client.emit('connectAPI',{})
            client.on('connected', (data) => { 
                const { code, player } = data;
                console.log(data)
                client.code = code;
                client.player = player
            });
            client.on('disconnect', () => { 
                this.sockets.splice(client.index,1);
            });
        });
       /* this.server = net.createServer((socket) => {
            socket.name = socket.remoteAddress+':'+socket.remotePort
            console.log('Connection from',socket.name)
            socket.emit('connected','Conectado\n')
            const length = this.sockets.length;
            socket.index = length;
            this.sockets.push(socket);
            socket.on('connect', (data) => {
                console.log(data)
                const {code, player} = data
                if (!code || !player ) {
                   // this.sockets.splice(socket.index,1)
                   // socket.end();
                } else {
                    socket.code = code;
                    socket.player = player;
                }
            })
            socket.on('end', () => {
              console.log(socket.name, 'disconnected');
            })
        })*/
        this.server.listen(8082);
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
        const socketsToNotif = this.sockets.filter(({ code }) => code === blackjack._id);
        socketsToNotif.forEach(socket => {
            console.log({
                players: blackjack.players,
                house: blackjack.house,
                code: blackjack._id,
                state: blackjack.state
             })
            socket.emit('update',{
                players: blackjack.players,
                house: blackjack.house,
                code: blackjack._id,
                state: blackjack.state
             });
        });
    }
    remove(_id,id) {
        this.sockets = this.sockets.filter(({ code, player}) => code !== _id && player !== id)
    }

}
const socket = new BlackJackSocket();
module.exports = socket;