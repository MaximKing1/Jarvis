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
  presence: 'online',
  status: {
    text: null,
    type: 0, // Types: 0 = Playing, 1 = Streaming, 2 = Listening
  },

  ws: {
    version: 8,
    api: 'https://discord.com/api',
    cdn: 'https://cdn.discordapp.com',
    invite: 'https://discord.gg',
    template: 'https://discord.new',
    large_threshold: 250,
    compress: false,
  },

  cache: {
    fetchAllMembers: false,
    fetchAllGuilds: false,
    fetchAllRoles: false,
    fetchAllChannels: false,
  },
};
