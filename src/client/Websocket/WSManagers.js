'use strict';

const EventEmitter = require("events");
const WebSocket = require("ws");
const socket = new WebSocket("wss://gateway.discord.gg/?v=8&encoding=json");
const { WSEvents } = require('../../constants/Constants');

const UNRESUMABLE_CLOSE_CODES = [1000, 4006, 4007];

class WSManager extends EventEmitter {
  constructor(client) {
    super();
      this.client = client;
   }

  async destroy() {
    console.log("[WS] Connection Destroyed!");
    process.exit();
  }

  async connect() {
    // Listens for the server open event
    socket.on("open", async function open(data) {
      console.log("[WS] Connected to the discord gateway")
    });

    // Listen for websocket messages then reply
    socket.on("message", async function incoming(data) {
    let d = JSON.parse(data) || incoming;
     const Heartbeat = {
         op: 1,
         d: d.s
      };
       await setInterval(async () => {
         await socket.send(Heartbeat);
         await console.log("[WS] Heartbeat sent");
       }, d.d.heartbeat_interval);
      
      socket.send(JSON.stringify({
                  op: 2,
                  d: {
                      token: this.token,
                      properties: {
                          $os: "linux",
                          $browser: "Jarvis",
                          $device: "Jarvis"
                      },
                      large_threshold: 250,
                      compress: false
                  }
              }));
      
    });

    socket.on("close", function incoming(data) {
      console.log("[WS] Connection died");
      if(data == "4008") {
      return console.log("[WS ERROR] Rate Limited!");
      } else if(data == "4003") {
      return console.log("[WS ERROR] Invalid token!");
      } else if(data == "4011") {
      return console.log("[WS ERROR] Sharding required to connect to discord");
      } else if(data == "4009") {
      return console.log("[WS ERROR] Session timed out");
      } else if(data == "4000") {
      return console.log("[WS ERROR] Unknown error");
      }
    })
  }

  triggerClientReady() {
    this.client.readyAt = new Date();
    /**
     * Emitted when the client becomes ready to start working.
     * @event Client#ready
     */
    this.emit("ready");
  }
}

module.exports = WSManager;
