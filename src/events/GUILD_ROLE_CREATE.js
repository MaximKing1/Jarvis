export default function (client, payload) {
    client.emit('roleCreated', payload);
}