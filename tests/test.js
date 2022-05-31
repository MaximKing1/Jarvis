const { Client } = require('../src/index');
const client = new Client({
  presence: 'dnd',
  status: {
    text: 'Status Text',
    type: 0, // Types: 0 = Playing, 1 = Streaming, 2 = Listening
  },
  ws: {
    large_threshold: 250,
    compress: false,
  },
});

client.login('TOKEN');

console.log(client.fetchGuild('768189909529133056'));

client.on('ready', async (user) => {
  console.log(user);
});

client.on('message', async (message) => {
  console.log(message.content);
});
