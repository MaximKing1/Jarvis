const { ClientUser } = require('../client/ClientUser.js');

export default function (client, payload) {
    const { d: user } = payload;

    client.user = new ClientUser(
        user.username,
        user.discriminator,
        user.verified,
        user.id,
        user.flags,
        user.email,
        user.bot,
        user.avatar
    );
    
    client.emit('ready');
}