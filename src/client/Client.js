'use strict';

const ENDPOINTS = require('../rest/endpoints');

const { DefaultOptions } = require('../../Utils/DefaultManager');
const merge = require('merge');

const WSManager = require('../WSManager');
const RequestHandler = require('./../rest/RequestHandler');
const GuildManager = require('./../managers/Guild');

let EventEmitter;
try {
  EventEmitter = require('eventemitter3');
} catch (err) {
  EventEmitter = require('events');
}

class Client extends EventEmitter {
  constructor(options = {}) {
    super();

    this.options = merge(DefaultOptions, options);

    this.GuildManager = new GuildManager(this);
    this.ws = new WSManager(this);
    this.rest = new RequestHandler(this);

    this.readyAt = null;
    this.user = null;
    this.sessionID = null;
    this.seq = null;
    this.ready = false;
    this.presence = {
      game: null,
      status: 'offline',
    };

    if (!this.token && 'DISCORD_TOKEN' in process.env) {
      this.token = process.env.DISCORD_TOKEN;
    } else {
      this.token = null;
    }
  }

  get readyTimestamp() {
    return this.readyAt || null;
  }

  async manualREST(url, method, options) {
    const trace = await this.rest.request(url, method, options);
    console.log(trace);
  }

  login(token = this.token) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
    this.token = token;
    this.emit(
      'debug',
      `[WS] Provided token: ${token
        .split('.')
        .map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
        .join('.')}`
    );
    this.emit('debug', '[WS] Preparing Gateway Connection...');

    try {
      this.ws.connect();
      return this.token;
    } catch (error) {
      this.ws.destroy();
      throw error;
    }
  }

  async fetchGuild(id) {
    await this.rest.request(
      `${ENDPOINTS.MAIN}/guilds/${id}?with_counts=true`,
      'GET',
      {
        'Content-Type': 'application/json',
        authorization: `Bot ${this.token}`,
      }
    );
    return this.rest._tracer;
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
