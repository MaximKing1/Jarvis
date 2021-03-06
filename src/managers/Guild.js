const RequestHandler = require("./../rest/RequestHandler");
const ENDPOINTS = require("../rest/endpoints");

class GuildManager {
  constructor() {

    this.members = new Map();
    this.channels = new Map();

    /**
     * The clients RequestHandler
     * @type {RequestHandler}
     */
    this.rest = new RequestHandler(this);
  }
}

module.exports = GuildManager;