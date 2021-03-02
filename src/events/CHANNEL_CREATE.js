export default function (client, payload) {
    client.emit('channelCreate', payload);
}