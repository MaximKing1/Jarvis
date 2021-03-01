"use strict";

const EventEmitter = require("events");
const { DefaultOptions } = require("../../Utils/DefaultManager");
const merge = require("merge");
const RESTManager = require("./Websocket/WSManager");

/**
 * The base class for all clients.
 * @extends {EventEmitter}
 */
class BaseClient extends EventEmitter {
  constructor(options = {}) {
    super();
    /**
     * The options the client was instantiated with
     * @type {ClientOptions}
     */
    this.options = merge(DefaultOptions, options);

      /**
     * The REST manager of the client
     * @type {RESTManager}
     * @private
     */
    this.rest = new RESTManager(this, options._tokenType);
  }
}

module.exports = BaseClient;
