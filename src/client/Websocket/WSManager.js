'use strict';

const EventEmitter = require("events");
const WebSocket = require("ws");
const os = require('os');
const { WSEvents } = require('../../constants/Constants');

const UNRESUMABLE_CLOSE_CODES = [1000, 4006, 4007];

class WSManager extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.socket = new WebSocket("wss://gateway.discord.gg/?v=8&encoding=json");
   }

  async destroy() {
    console.log("[WS] Connection Destroyed!");
    process.exit();
  }

      connect() {  
        this.socket.on('message', async(message) => {
        const d = JSON.parse(message) || incoming;
        const { t: event } = JSON.parse(message) || incoming;
       const sequence = d.s;

        switch(d.op) {
            case 0:
                break;

            case 10:
            setInterval(() => {
                    this.socket.send(JSON.stringify({
                        op: 1,
                        d: sequence
                    }, d.d.heartbeat_interval))
                }, d.d.hearbeat_interval)

            this.socket.send(JSON.stringify({
              op: 2,
              d: {
                token: this.token,
                properties: {
                  $os: os.platform(),
                  $browser: "Jarvis",
                  $device: "Jarvis"
                },
                large_threshold: 250,
                compress: false
              }
            }));
            break;
          
          case 11:
            this.client.emit("debug", "[WS] Heartbeat Recived");
                break;
          }

          if(event) {
            const { d: user } = JSON.parse(message) || incoming;
console.log("Event Recived")
            try {
                const { default: module } = await import(`../events/${event}.js`);
                module(this.client, JSON.parse(message.toString()))
            } catch(err) {
                throw err;
            }
        }
      });
    }

  triggerClientReady() {
    this.client.readyAt = new Date();
    /**
     * Emitted when the client becomes ready to start working.
     * @event Client#ready
     */
    this.client.emit("ready");
  }
}

module.exports = WSManager;