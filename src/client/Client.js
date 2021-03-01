"use strict";

const BaseClient = require("./BaseClient");
const WSManager = require("./Websocket/WSManager");

class Client extends BaseClient {
  constructor(options) {
    super(options);
     /**
     * The clients WebsocketManager
     * @type {WebsocketManager}
     */
    this.ws = new WSManager(this);

    /**
     * Client readyAT
     * @type {client.readyAt}
     */
    this.readyAt = null;

    if (!this.token && "DISCORD_TOKEN" in process.env) {
      this.token = process.env.DISCORD_TOKEN;
    } else {
      this.token = null;
    }
  }

  get readyTimestamp() {
    return this.readyAt : null;
  }

  async user() {

  return user;
  }

  async login(token = this.token) {
    if (!token || typeof token !== "string") throw new Error("TOKEN_INVALID");
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
      await this.ws.connect();
      return this.token;
    } catch (error) {
      this.ws.destroy();
      throw error;
    }
  }

  destroy() {
  super.destroy();
  this.ws.destroy();
  this.token = null;
  }
}

module.exports = Client;
