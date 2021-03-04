const HTTPS = require("https");

class RequestHandler {
    constructor(client) {
        this.client = client;
        this.baseURL = "N/A";
        this.userAgent = `Jarvis.djs`;
        this.ratelimits = {};
        this.requestTimeout = client.options.requestTimeout;
        this.agent = client.options.agent;
        this.latencyRef = {
            latency: 500,
            offset: client.options.ratelimiterOffset,
            raw: new Array(10).fill(500),
            timeOffset: 0,
            timeOffsets: new Array(10).fill(0),
            lastTimeOffsetCheck: 0
        };
        this.readyQueue = [];
    }
}

module.exports = RequestHandler;
