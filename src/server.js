const IO = require('socket.io');

class Server {
    constructor(props) {
        this.tabs = [];
        this.ws = new IO(props.port);
        this.ws.on('connection', (socket) => {
            this.socket = socket;
            socket.emit('reopen', this.tabs, () => {
                this.tabs = [];
            });
        });
    }

    sayReload(){
        var { socket } = this;

        if(socket){
            socket.emit('reload', {}, (tabs) => {
                this.tabs = tabs;
            });
        }
    }
}

module.exports = Server;