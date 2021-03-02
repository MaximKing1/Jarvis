[![NPM](https://nodei.co/npm/jarvis.djs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jarvis.djs/)

# Jarvis.djs - JavaScript Discord Libary

# Table of Contents

- [Installation](#installation)
- [Setup](#setup)

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

# Setup

### Import the lib via ES6 or commonJS modules

```js
// ES6
import * as discord from "jarvis.djs";
// or commonJS
const discord = require("jarvis.djs");
```

### Seting it up

```js
const discord = require('jarvis.djs');
const client = new discord.Client({
    presence: "online",
    status: {
        text: "Status Text",
        type: 0
    }
});

client.on("ready", async() => {
    console.log("Ready!")
})

client.login("TOKEN")
```