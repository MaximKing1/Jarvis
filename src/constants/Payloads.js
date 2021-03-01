const Heartbeat = {
    op: 1,
    d: null
}

const Identify = {
    op: 10,
    d: {
        token: '',
        properties: {
            $os: 'linux',
            $browser: 'discord.ji',
            $device: 'discord.ji'
        }
    }
}

module.exports.Heartbeat = Heartbeat;
module.exports.Identify = Identify;
