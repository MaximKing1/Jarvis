'use strict';

const fetch = require('node-fetch');

class RequestHandler {
  constructor(client) {
    this.client = client;
    this.userAgent = `DiscordBot (https://github.com/JarvisDJS/Jarvis)`;
  }

  async request(url, method, options, body) {
    const HTTPoptions = {
      method: method,
      body: JSON.stringify(body) || null,
      headers: options || {
        'Content-Type': 'application/json',
        authorization: `Bot ${this.client.token}`,
        'X-XSS-Protection': '1',
        'User-Agent': this.userAgent,
        'Accept-Encoding': 'gzip,deflate',
        'X-RateLimit-Precision': 'millisecond',
      },
    };

      return await fetch(url, HTTPoptions)
          .then((res) => res.json());
  }
}

module.exports = RequestHandler;
