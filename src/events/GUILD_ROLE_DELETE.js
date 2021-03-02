export default function (client, payload) {
    client.emit('roleDeleted', payload);
}