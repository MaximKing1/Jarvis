const discord = require('../src/index');
const client = new discord.Client({
    presence: "online",
    status: {
        text: "Status Text",
        type: 0 // Types: 0 = Playing, 1 = Streaming, 2 = Listening
    },
    cache: {
        fetchAllMembers: false,
        fetchAllGuilds: false,
        fetchAllRoles: false,
        fetchAllChannels: false
    },
    ws: {
      large_threshold: 250,
      compress: false
    }
});

client.login("TOKEN");

client.createGuild("TESTING").then(res => {
    console.log(res)
});

client.on("ready", async() => {
    console.log("Ready!")
});