<p align="center">
 <img width="100px" src="" align="center" alt="Jarvis" />
 <h2 align="center">Jarvis</h2>
 <p align="center">Javascript Discord Lib For Interacting With The Discord API!</p>
</p>
  <p align="center">
    <a href="https://github.com/MaximKing1/Jarvis/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/MaximKing1/Jarvis?color=0088ff" />
    </a>
    <a href="https://github.com/MaximKing1/Jarvis/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/MaximKing1/Jarvis?color=0088ff" />
    </a>
    <br />
    <br />
  </p>

[![NPM](https://nodei.co/npm/jarvis.djs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jarvis.djs/)

## This Is Not Fully Working! Please Do Not Donwload and Complain Because This Is a Work In Progress! PR Welcomed!

# Table of Contents

- [Support Server](https://discord.gg/NybFm5ct)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Events](#events)
- [Discord Gateway](#discord-gateway)

## Requirements

- Node.JS => 14.0.0
 
# Installation

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
    ws: {
      large_threshold: 250,
      compress: false
    }
});

// Add This Before Anything Else
client.login("TOKEN");

client.on("ready", async() => {
    console.log("Ready!")
});
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

**Manual REST Request:**
```js
client.manualREST("https://discordapp.com/api/v8/gateway", "GET", {
    'Content-Type': 'application/json',
    'authorization': 'Bot <TOKEN>'
});
```

**Fetch Guild:**
```js
client.fetchGuild("ID").then(res => {
    console.log(res);
});
```

# Events

**Ready Event:**
```js
ready - When Client Is Ready
warn - Warnings
error - When There Is An Error
```

**

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
