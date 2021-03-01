const discord = require("./src/index.js");

const client = new discord.Client({
  
});

client.on("debug", async (d) => {
  console.log(d);
});

client.login("NzcxNDgzNzQxOTc3NzA2NTI2.X5syOQ.yllSJdcpMy7eC1o8ynXJnzsGKxU");
