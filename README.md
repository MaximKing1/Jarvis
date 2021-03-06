<p align="center">
 <img width="100px" src="" align="center" alt="Jarvis" />
 <h2 align="center">Jarvis</h2>
 <p align="center">Javascript Discord Lib For Interacting With The Discord API!</p>
</p>
  <p align="center">
  <a href="https://snyk.io/test/github/Strider-Bot/BLWebhooks/badge.svg">
      <img alt="Issues" src="https://snyk.io/test/github/Strider-Bot/BLWebhooks/badge.svg" />
    </a>
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
    guild_subscriptions: false,
    intents: 32509,  // https://ziad87.net/intents/
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

client.on("message", async (message) => {
    console.log(message.content);
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

**Create Guild:**
```js
client.createGuild(name, region, icon).then(res => {
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

# Discord Gateway
This is the connection between the client and discord api servers.
