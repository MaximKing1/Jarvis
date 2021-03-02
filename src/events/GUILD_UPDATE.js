export default function (client, payload) {
    client.emit('guildUpdate', payload);
}