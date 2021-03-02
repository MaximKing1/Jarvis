export default function (client, payload) {
    client.emit('guildDelete', payload);
}