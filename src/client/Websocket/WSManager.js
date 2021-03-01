'use strict';

const EventEmitter = require("events");
const WebSocket = require("ws");
const { WSEvents } = require('../../util/Constants');

const ReadyWhitelist = [
  WSEvents.READY,
  WSEvents.RESUMED,
  WSEvents.GUILD_CREATE,
  WSEvents.GUILD_DELETE,
  WSEvents.GUILD_MEMBERS_CHUNK,
  WSEvents.GUILD_MEMBER_ADD,
  WSEvents.GUILD_MEMBER_REMOVE,
];

const UNRESUMABLE_CLOSE_CODES = [1000, 4006, 4007];

class WSManager extends EventEmitter {
  constructor(client) {
    super();

      this.socket = new WebSocket("wss://gateway.discord.gg/?v=8&encoding=json");
   }

  async destroy() {
    console.log("[WS] Connection Destroyed!");
    process.exit();
  }

  async connect() {

    console.log(`Session Limit Information:\nTotal: ${total}\nRemaining: ${remain}`);

    // Listens for the server open event
    this.socket.on("open", async function open(data) {
      console.log("[WS] Connected to the discord gateway")
    });

    // Listen for websocket messages then reply
    this.socket.on("message", async function incoming(data) {
      let dataJSON = JSON.parse(data);
      var objectString = {
       op: "1",
       d: null
      }
      console.log(dataJSON)
       await setInterval(async () => {
         await ws.send(objectString);
         await console.log("[WS] Heartbeat sent");
       }, dataJSON.d.heartbeat_interval);
    });

    this.socket.on("close", function incoming(data) {
      console.log("[WS] Connection died")
      console.log(data)
    })
  }
}

module.exports = WSManager;
