'use strict';

const EventEmitter = require("events");
const WebSocket = require("ws");
const { WSEvents } = require('../../constants/Constants');
const { Gateway } = require('../../connections');
const fetch = require('node-fetch');

class WSManager extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;

    this.ws = new WebSocket(Gateway);

    this.status = "offline";
   }
  
  async destroy() {
    console.log("[WS] Connection Destroyed!");
    process.exit();
  }

 connect() {
   this.connecting = true;
   return this.identify();
  }

  async identify() {
    this.ws.on('open', async (open) => {
      console.log("[WS] Connected to the discord gateway...");
      this.status = "connecting";
      this.ws.send(JSON.stringify({
        op: 2,
        d: {
          token: this.token,
          v: 8,
          large_threshold: this.client.options.large_threshold,
          compress: this.client.options.compress,
          properties: {
            $os: process.platform,
            $browser: "Jarvis",
            $device: "Jarvis"
          },
          presence: {
            activities: [{
              name: this.client.options.status.text,
              type: this.client.options.status.type
            }],
            status: this.client.options.presence,
            since: Date.now(),
            afk: false
          }
        }
      }));
      this.client.readyAt = new Date();
    });

    this.ws.on('message', async (message) => {
      const d = JSON.parse(message) || incoming;
      const { t: event } = JSON.parse(message) || incoming;
      const sequence = d.s;

      switch (d.op) {

        case 0: {
          console.log("[WS] Event")
          break;
        }
          
        case 7: {
         
          break;
        }
          
        case 9: {
          this.seq = 0;
          this.sessionID = null;
          this.client.emit("warn", "Invalid session, reidentifying!");
          this.connect();
          break;
        }
          
        case 10: {
          this.status = "handshaking";
          setInterval(() => {
            this.ws.send(JSON.stringify({
              op: 1,
              d: sequence
            }, d.d.heartbeat_interval))
          }, d.d.hearbeat_interval);
          this.lastHeartbeatSent = new Date().getTime();
          break;
        }
          
        case 11: {
          this.client.emit("debug", "[WS] Heartbeat Recived");
          break;
        }
      }
      
      if (event) {
        const { d: user } = JSON.parse(message) || incoming;
        console.log("Event Recived");
        try {
          const { default: module } = await import(`../../events/${event}.js`);
          module(this.client, JSON.parse(message.toString()))
        } catch (err) {
          throw err;
        }
      }
    });
    
    this.ws.on("error", async (data) => {
      this.client.emit("error", data);
    });
    
    this.ws.on("close", async (data) => {
      let reconnect;
      console.log(`[WS] Connection died (Code: ${data})`);
      if (data == "4008") {
        console.log("[WS ERROR] Rate Limited!");
        reconnect = false;
      } else if (data == "4003") {
        console.log("[WS ERROR] Invalid token!");
        reconnect = false;
      } else if (data == "4011") {
        console.log("[WS ERROR] Sharding required to connect to discord");
        reconnect = false;
      } else if (data == "4009") {
        console.log("[WS ERROR] Session timed out");
        reconnect = true;
      } else if (data == "4000") {
        console.log("[WS ERROR] Unknown error");
        reconnect = true;
      } else if (data == "4012") {
        console.log("[WS ERROR] Invalid API Version");
        reconnect = false;
      } else if (data == "4004") {
        console.log("[WS ERROR] Rate Limited!");
        reconnect = false;
      }
      if (reconnect == true) return this.resume();
    })
  }

  resume() {
    this.status = "resuming";
    console.log("[WS] Reconnecting...");
      this.ws.send(JSON.stringify({
         op: 6,
           d: {
            token: this.token,
            session_id: this.session_id,
            seq: this.seq
          }
      }));
    }
}

module.exports = WSManager;