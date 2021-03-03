'use strict';

const BaseClient = require("./BaseClient");
const WSManager = require("./Websocket/WSManager");
const RequestHandler = require("./../rest/RequestHandler");

class Client extends BaseClient {
  constructor(options) {
    super(options);

    /**
     * The clients WebsocketManager
     * @type {WebsocketManager}
     */
    this.ws = new WSManager(this);

    /**
     * The clients RequestHandler
     * @type {RequestHandler}
     */
    this.api = new RequestHandler(this);

    this.readyAt = null;
    this._user = null;
    this.session_id = null;
    this.seq = null;
    this.ready = false;
    this.presence = {
       game: null,
       status: "offline"
    };

    if (!this.token && "DISCORD_TOKEN" in process.env) {
      this.token = process.env.DISCORD_TOKEN;
    } else {
      this.token = null;
    }
  }

  get readyTimestamp() {
    return this.readyAt || null;
  }

  get uptimeMS() {
    return os.uptime();
  }

  async user() {
  return user;
  }

  async login(token = this.token) {
   if (!token || typeof token !== "string") throw new Error("TOKEN_INVALID");
   if(this.options.compress) {
      this.gatewayURL += "&compress=zlib-stream";
   }
   this.token = token;
    this.emit(
      "debug",
      `[WS] Provided token: ${token
        .split('.')
        .map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
        .join('.')}`,
    );
    this.emit("debug", "[WS] Preparing Gateway Connection...");

    try {
      await this.ws.connect(token);
      return this.token;
    } catch (error) {
      super.destroy();
      this.ws.destroy();
      throw error;
    }
  }

  destroy() {
  super.destroy();
  this.ws.destroy();
  this.token = null;
  }

  _eval(script) {
    return eval(script);
  }
}

module.exports = Client;
