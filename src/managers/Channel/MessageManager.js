'use strict';

const EventEmitter = require("events");

class message extends EventEmitter {
    constructor(client, message, channel) {
        super(client);
        this.client = client;
    }
}

module.exports = message;