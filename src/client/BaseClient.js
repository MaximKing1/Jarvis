"use strict";

const EventEmitter = require("events");
const { DefaultOptions } = require("../../Utils/DefaultManager");
const merge = require("merge");
const RESTManager = require("../WSManager");

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
  }
}

module.exports = BaseClient;
