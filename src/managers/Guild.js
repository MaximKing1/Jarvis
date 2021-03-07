const RequestHandler = require('./../rest/RequestHandler');
const ENDPOINTS = require('./../rest/endpoints');

class GuildManager {
  constructor(client) {
    this.client = client;
    this.members = new Map();
    this.channels = new Map();

    this.rest = new RequestHandler(this);
  }

  async fetchGuild(id) {
    return await this.rest
      .request(`${ENDPOINTS.MAIN}/guilds/${id}?with_counts=true`, 'GET', {
        'Content-Type': 'application/json',
        authorization: `Bot ${this.client.token}`,
      })
  }
  
}

module.exports = GuildManager;
