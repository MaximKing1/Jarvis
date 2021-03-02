const discord = require('./src/index.js');
const client = new discord.Client({
    presence: "online",
    status: {
        text: "TESTING",
        type: 0 // Types: 0 = Playing, 1 = Streaming, 2 = Listening
    }
});

client.on("ready", async() => {
    console.log("Ready!")
})

client.login("NzcxNDgzNzQxOTc3NzA2NTI2.X5syOQ.yllSJdcpMy7eC1o8ynXJnzsGKxU")
