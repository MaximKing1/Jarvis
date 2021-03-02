exports.DefaultOptions = {
  shardCount: 1,
  messageCacheMaxSize: 200,
  messageCacheLifetime: 0,
  messageSweepInterval: 0,
  partials: [],
  restWsBridgeTimeout: 5000,
  restRequestTimeout: 15000,
  retryLimit: 1,
  restTimeOffset: 500,
  restSweepInterval: 60,
  presence: {},

  /**
   * HTTP options
   * @typedef {Object} HTTPOptions
   * @property {number} [version=8] API version to use
   * @property {string} [api='https://discord.com/api'] Base url of the API
   * @property {string} [cdn='https://cdn.discordapp.com'] Base url of the CDN
   * @property {string} [invite='https://discord.gg'] Base url of invites
   * @property {string} [template='https://discord.new'] Base url of templates
   */
  http: {
    version: 8,
    api: "https://discord.com/api",
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
  },
};
