export default function (client, payload) {
    client.emit('roleUpdated', payload);
}