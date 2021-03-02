const discord = require("./src/index.js");

const client = new discord.Client({
  
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login("NzcxNDgzNzQxOTc3NzA2NTI2.X5syOQ.yllSJdcpMy7eC1o8ynXJnzsGKxU");
