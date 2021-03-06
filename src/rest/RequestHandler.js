const fetch = require('node-fetch');

class RequestHandler {
    constructor(client) {
        this.client = client;
    }

    async request(url, method, options) {
        await fetch(url, {
            method: method,
            headers: options || {
                'Content-Type': 'application/json',
                'authorization': `Bot ${this.client.token}`
            },
        })
            .then(res => res.json())
            .then(json => {
                this._tracer = json;
            })
        const trace = this._tracer;
        return trace;
    }
    
}

module.exports = RequestHandler;
