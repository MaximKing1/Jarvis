const discord = require("./src/index.js");

const client = new discord.Client({
  presence: "online",
  status: {
    text: "Testing Status",
    type: "0"
  }
});

console.log(client.uptime)

client.on("ready", () => {
  console.log("Ready");
});

client.login("NzcxNDgzNzQxOTc3NzA2NTI2.X5syOQ.yllSJdcpMy7eC1o8ynXJnzsGKxU");
