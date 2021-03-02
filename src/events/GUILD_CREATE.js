export default function (client, payload) {
    const request = JSON.parse(payload);
    client.emit('guildCreate', request);
}