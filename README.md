[![NPM](https://nodei.co/npm/jarvis.djs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jarvis.djs/)

# Jarvis.djs - AI JavaScript Discord Libary

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Events](#events)
- [Discord Gateway](#discord-gateway)

# Installation

Jarvis.djs is a JavaScript Discord Libary used for interacting with discord bots, this is very new so please feel free to contribute to help the project! To install this use either NPM or Yarn and follow the guide below.

## NPM (recommended)

```js
# Stable
npm i --save jarvis.djs

# Nightly Builds
npm i --save jarvis.djs@nightly
```

## Yarn

```js
# Stable
yarn add jarvis.djs

# Nightly Builds
yarn add jarvis.djs@nightly
```

# Usage

### Import the lib via ES6 or commonJS modules

```js
// ES6
import * as discord from "jarvis.djs";
// or commonJS
const discord = require("jarvis.djs");
```

### Client

```js
const discord = require('jarvis.djs');
const client = new discord.Client({
    presence: "online",
    status: {
        text: "Status Text",
        type: 0 // Types: 0 = Playing, 1 = Streaming, 2 = Listening
    },
    cache: {
        fetchAllMembers: false,
        fetchAllGuilds: false,
        fetchAllRoles: false,
        fetchAllChannels: false
    }
});

client.on("ready", async() => {
    console.log("Ready!")
})

client.login("TOKEN")
```

### Client Methods

**Destroy Client:**
```js
client.destroy(); // Will destroy the client along with the discord connection
```

**Ready Timestamp:**
```js
client.readyAt();
```

# Events

## Events To-Do List
```js
GUILDS (1 << 0)
  - GUILD_CREATE // Done
  - GUILD_UPDATE // Done
  - GUILD_DELETE // Done
  - GUILD_ROLE_CREATE // Done
  - GUILD_ROLE_UPDATE // Done
  - GUILD_ROLE_DELETE // Done
  - CHANNEL_CREATE // Done
  - CHANNEL_UPDATE
  - CHANNEL_DELETE
  - CHANNEL_PINS_UPDATE

GUILD_MEMBERS (1 << 1)
  - GUILD_MEMBER_ADD
  - GUILD_MEMBER_UPDATE
  - GUILD_MEMBER_REMOVE

GUILD_BANS (1 << 2)
  - GUILD_BAN_ADD
  - GUILD_BAN_REMOVE

GUILD_EMOJIS (1 << 3)
  - GUILD_EMOJIS_UPDATE

GUILD_INTEGRATIONS (1 << 4)
  - GUILD_INTEGRATIONS_UPDATE

GUILD_WEBHOOKS (1 << 5)
  - WEBHOOKS_UPDATE

GUILD_INVITES (1 << 6)
  - INVITE_CREATE
  - INVITE_DELETE

GUILD_VOICE_STATES (1 << 7)
  - VOICE_STATE_UPDATE

GUILD_PRESENCES (1 << 8)
  - PRESENCE_UPDATE

GUILD_MESSAGES (1 << 9)
  - MESSAGE_CREATE
  - MESSAGE_UPDATE
  - MESSAGE_DELETE
  - MESSAGE_DELETE_BULK

GUILD_MESSAGE_REACTIONS (1 << 10)
  - MESSAGE_REACTION_ADD
  - MESSAGE_REACTION_REMOVE
  - MESSAGE_REACTION_REMOVE_ALL
  - MESSAGE_REACTION_REMOVE_EMOJI

GUILD_MESSAGE_TYPING (1 << 11)
  - TYPING_START

DIRECT_MESSAGES (1 << 12)
  - MESSAGE_CREATE
  - MESSAGE_UPDATE
  - MESSAGE_DELETE
  - CHANNEL_PINS_UPDATE

DIRECT_MESSAGE_REACTIONS (1 << 13)
  - MESSAGE_REACTION_ADD
  - MESSAGE_REACTION_REMOVE
  - MESSAGE_REACTION_REMOVE_ALL
  - MESSAGE_REACTION_REMOVE_EMOJI

DIRECT_MESSAGE_TYPING (1 << 14)
  - TYPING_START
```

# Discord Gateway
This is the connection between the client and discord api servers.
