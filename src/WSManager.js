'use strict';

const EventEmitter = require("events");
const WebSocket = require("ws");
const { GATEWAY, GATEWAYVERSION } = require('./constants/Constants');

class WSManager extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;

    this.ws = new WebSocket(`${GATEWAY}/?v=${GATEWAYVERSION}&encoding=json`);

    this.status = "offline";
   }
  
  async destroy() {
    console.log("[WS] Connection Destroyed!");
    super.destroy();
    this.client.destroy();
    this.client.token = null;
  }

 connect() {
   this.connecting = true;
   return this.identify();
  }

  async identify() {
    this.ws.once("open", async (open) => {
      console.log("[WS] Connected to the discord gateway...");
      this.status = "connecting";
      this.ws.send(JSON.stringify({
        op: 2,
        d: {
          token: this.token,
          v: 8,
          large_threshold: this.client.options.large_threshold || 250,
          compress: this.client.options.compress || false,
          properties: {
            $os: process.platform,
            $browser: "Jarvis",
            $device: "Jarvis"
          },
          presence: {
            activities: [{
              name: this.client.options.status.text || null,
              type: this.client.options.status.type || 0
            }],
            status: this.client.options.presence || "online",
            since: Date.now(),
            afk: false
          }
        }
      }));
      this.client.readyAt = new Date();
    });

   this.ws.once("ready", (u) => {
      this.client.emit("debug", "[WS] Websockets ready received...);
      this.status = "ready";
      this.user = u;
    });
      
    this.ws.on("message", async (message) => {
      const packet = JSON.parse(message) || incoming;
      const sequence = packet.s;

      if(packet.s) {
      this.seq = packet.s;
      }

      switch (packet.op) {

        case 0: {
          this.WSEvent(packet);
          console.log(`[WS] Event Received - (${packet})`);
          break;
        }
          
          case 1: {
           this.handshake(sequence, packet);
           break;
        }
              
        case 7: {
          this.reconnect();
          break;
        }
          
        case 9: {
          this.seq = 0;
          this.sessionID = null;
          this.client.emit("warn", "Invalid session, reidentifying!");
          this.connect();
          break;
        }
          
        case 10: {
          this.status = "handshaking";
          setInterval(() => {
            this.ws.send(JSON.stringify({
              op: 1,
              d: sequence
            }, packet.d.heartbeat_interval))
          }, packet.d.hearbeat_interval);
          this.lastHeartbeatSent = new Date().getTime();
          break;
        }
          
        case 11: {
          this.client.emit("debug", "[WS] Heartbeat Recived");
          break;
        }
      }
   });
    
    this.ws.on("ping", async (data) => {
    this.client.emit("ping", data);
    });

    this.ws.on("error", (data) => {
      this.client.emit("error", data);
    });
    
    this.ws.once("close", async (data) => {
      let reconnect;
        console.log(`[WS] Connection died (Code: ${data})`);
        if (data == "4008") {
        this.client.emit("rateLimited", data);
        console.log("[WS ERROR] Rate Limited!");
        reconnect = false;
        } else if (data == "4003") {
        this.client.emit("invaild", "[WS] Invild Token");
        console.log("[WS ERROR] Invalid token!");
        reconnect = false;
        } else if (data == "4011") {
        this.client.emit("invaild", "[WS] Sharding required to connect to discord");
        console.log("[WS ERROR] Sharding required to connect to discord");
        reconnect = false;
        } else if (data == "4009") {
        this.client.emit("invaild", "[WS] Session timed out");
        console.log("[WS ERROR] Session timed out");
        reconnect = true;
        } else if (data == "4000") {
        this.client.emit("invaild", "[WS] Unknown error");
        console.log("[WS ERROR] Unknown error");
        reconnect = true;
        } else if (data == "4012") {
        this.client.emit("gateway", "[WS] Invalid API Version");
        console.log("[WS ERROR] Invalid API Version");
        reconnect = false;
        } else if (data == "4004") {
        this.client.emit("invaild", "The token is incorrect.");
        console.log("[WS ERROR] Invalid Token Provided!");
        reconnect = false;
        } else if (data == "4013") {
        this.client.emit("intentsError", data);
        console.log("[WS ERROR] Invalid intent(s)!");
        reconnect = false;
        } else if (data == "4014") {
        this.client.emit("intentsError", data);
        console.log("[WS ERROR] Disallowed intent(s)!");
        reconnect = false;
      } 
      if (reconnect == true) return this.resume();
    })
  }

  handshake(seq, pack) {
         this.ws.send(JSON.stringify({
             op: 1,
             d: seq
           }, pack.d.heartbeat_interval))
        this.lastHeartbeatSent = new Date().getTime();
  }

 async WSEvent(packet) {
   switch (packet.t) {
    
       case "PRESENCE_UPDATE": {
           this.client.emit("presenceUpdate");
                break;
            }
         
            case "VOICE_STATE_UPDATE": {
             this.client.emit("voiceStateUpdated");
                break;
            }
         
            case "TYPING_START": {
              this.client.emit("typingStarted");
                break;
            }
         
            case "MESSAGE_CREATE": {
              this.client.emit("message", packet.d);
                break;
            }
         
            case "MESSAGE_UPDATE": {
              this.client.emit("messageUpdate");
                break;
            }
         
            case "MESSAGE_DELETE": {
              this.client.emit("messageDeleted");
                break;
            }
         
            case "MESSAGE_DELETE_BULK": {
              this.client.emit("messageBulkDeleted");
                break;
            }
         
            case "MESSAGE_REACTION_ADD": {
              this.client.emit("reactionAdded");
                break;
            }
         
            case "MESSAGE_REACTION_REMOVE": {
              this.client.emit("reactionRemoved");
                break;
            }
         
            case "MESSAGE_REACTION_REMOVE_ALL": {
               this.client.emit("reactionBulkDeleted")(
                break;
            }
         
            case "MESSAGE_REACTION_REMOVE_EMOJI": {
               // Need to check this
                break;
            }
         
            case "GUILD_MEMBER_ADD": {
               this.client.emit("memberAdded");
                break;
            }
         
            case "GUILD_MEMBER_UPDATE": {
              this.client.emit("memberUpdated");
                break;
            }
         
            case "GUILD_MEMBER_REMOVE": {
              this.client.emit("memberRemoved");
                break;
            }
         
            case "GUILD_CREATE": {
               this.client.emit("guildCreate", { id: packet.d.id });
                break;
            }
         
            case "GUILD_UPDATE": {
             this.client.emit("guildUpdated", { id: packet.d.id });
                break;
            }
         
            case "GUILD_DELETE": {
              this.client.emit("guildDelete", { id: packet.d.id });
                break;
            }
         
            case "GUILD_BAN_ADD": {
              this.client.emit("guildBanAdd");
                break;
            }
         
            case "GUILD_BAN_REMOVE": {
             this.client.emit("guildBanRemoved");
                break;
            }

            case "GUILD_ROLE_CREATE": {
              this.client.emit("guildRoleCreated");
                break;
            }
         
            case "GUILD_ROLE_UPDATE": {
              this.client.emit("guildRoleUpdated");
                break;
            }
         
            case "GUILD_ROLE_DELETE": {
              this.client.emit("guildRoleDeleted");
               break;
            }
         
            case "INVITE_CREATE": {
              this.client.emit("inviteCreated");
                break;
            }
         
            case "INVITE_DELETE": {
             this.client.emit("inviteDeleted");
                break;
            }
         
            case "CHANNEL_CREATE": {
             this.client.emit("channelCreated");
                break;
            }
         
            case "CHANNEL_UPDATE": {
              this.client.emit("channelUpdated");
                break;
            }
         
            case "CHANNEL_DELETE": {
              this.client.emit("channelDeleted");
                break;
            }
         
            case "CALL_CREATE": {
            
                break;
            }
         
            case "CALL_UPDATE": {

                break;
            }
         
            case "CALL_DELETE": {

                break;
            }
         
            case "CHANNEL_RECIPIENT_ADD": {
                this.client.emit("channelRecAdd");
                break;
            }
         
            case "CHANNEL_RECIPIENT_REMOVE": {
                this.client.emit("channelRecRemove");
                break;
            }
         
            case "FRIEND_SUGGESTION_CREATE": {
                this.client.emit("friendSuggestionCreate", new User(packet.d.suggested_user, this.client), packet.d.reasons);
                break;
            }
         
            case "FRIEND_SUGGESTION_DELETE": {
                this.client.emit("friendSuggestionDelete", this.client.users.get(packet.d.suggested_user_id));
                break;
            }
         
            case "GUILD_MEMBERS_CHUNK": {
                this.client.emit("guildMembersChunk");
                this.lastHeartbeatAck = true;
                break;
            }
         
            case "GUILD_SYNC": {
                this.client.emit("guildSync");
                break;
            }
         
            case "RESUMED": {
            this.client.emit("RESUMED");
            }
         
            case "READY": {
           
               this.emit("ready", packet.d.user);
           
                this.is_ready = true;

                this.connectAttempts = 0;
                this.reconnectInterval = 1000;

                this.connecting = false;
           
                this.connectTimeout = null;
                this.status = "ready";
                this.presence.status = "online";
                this.client.shards._readyPacketCB();

                if(packet.t === "RESUMED") {
                    this.resume();

                    this.preReady = true;
                    this.ready = true;

                    super.emit("resume");
                    break;
                }

                if(this.client.user.bot) {
                    this.client.bot = true;
                    if(!this.client.token.startsWith("Bot ")) {
                        this.client.token = "Bot " + this.client.token;
                    }
                } else {
                    this.client.bot = false;
                    this.client.userGuildSettings = {};
                    packet.d.user_guild_settings.forEach((guildSettings) => {
                        this.client.userGuildSettings[guildSettings.guild_id] = guildSettings;
                    });
                    this.client.userSettings = packet.d.user_settings;
                }

                if(packet.d._trace) {
                    this.discordServerTrace = packet.d._trace;
                }

              this.sessionID = packet.d.session_id;

                packet.d.guilds.forEach((guild) => {
                    if(guild.unavailable) {
                        this.client.guilds.remove(guild);
                        this.client.unavailableGuilds.add(guild, this.client, true);
                    } else {
                        this.client.unavailableGuilds.remove(this.createGuild(guild));
                    }
                });

                packet.d.private_channels.forEach((channel) => {
                    if(channel.type === undefined || channel.type === ChannelTypes.DM) {
                        this.client.privateChannelMap[channel.recipients[0].id] = channel.id;
                        this.client.privateChannels.add(channel, this.client, true);
                    } else if(channel.type === ChannelTypes.GROUP_DM) {
                        this.client.groupChannels.add(channel, this.client, true);
                    } else {
                        this.client.emit("warn", new Error("Unhandled READY private_channel type: " + JSON.stringify(channel, null, 2)));
                    }
                });

                if(packet.d.relationships) {
                    packet.d.relationships.forEach((relationship) => {
                        this.client.relationships.add(relationship, this.client, true);
                    });
                }

                if(packet.d.presences) {
                    packet.d.presences.forEach((presence) => {
                        if(this.client.relationships.get(presence.user.id)) { // Avoid DM channel presences which are also in here
                            presence.id = presence.user.id;
                            this.client.relationships.update(presence, null, true);
                        }
                    });
                }

                if(packet.d.notes) {
                    this.client.notes = packet.d.notes;
                }

                this.preReady = true;

                this.client.emit("shardPreReady", this.id);

                if(this.client.unavailableGuilds.size > 0 && packet.d.guilds.length > 0) {
                    this.restartGuildCreateTimeout();
                } else {
                    this.checkReady();
                }

                break;
             }
         
            case "VOICE_SERVER_UPDATE": {
                packet.d.session_id = this.sessionID;
                packet.d.user_id = this.client.user.id;
                packet.d.shard = this;
                this.client.voiceConnections.voiceServerUpdate(packet.d);
                break;
            }
         
            case "USER_UPDATE": {
                break;
            }
         
            case "RELATIONSHIP_ADD": {
                break;
            }
         
            case "RELATIONSHIP_REMOVE": {
                break;
            }
         
            case "GUILD_EMOJIS_UPDATE": {
                const {emojis: oldEmojis} = guild;
                guild.update(packet.d);
           
                this.client.emit("guildEmojisUpdate", packet.d.guild_id, guild.emojis, oldEmojis);
                break;
            }
         
            case "CHANNEL_PINS_UPDATE": {
                channel.lastPinTimestamp = Date.parse(packet.d.last_pin_timestamp);

                this.client.emit("channelPinUpdate", channel.lastPinTimestamp);
                break;
            }
         
            case "WEBHOOKS_UPDATE": {
                this.client.emit("webhooksUpdate", {
                    channelID: packet.d.channel_id,
                    guildID: packet.d.guild_id
                });
                break;
            }
         
            case "PRESENCES_REPLACE": {
                break;
            }
         
            case "USER_NOTE_UPDATE": {
                break;
            }
         
            case "USER_GUILD_SETTINGS_UPDATE": {
                this.client.userGuildSettings[packet.d.guild_id] = packet.d;
                break;
            }
           
            case "MESSAGE_ACK": {
              this.client.emit("ignored", packet);
              break;
            }
           
            case "GUILD_INTEGRATIONS_UPDATE": {
           this.client.emit("guildIntergrationUpdated", packet);
              break;
            }
           
            case "USER_SETTINGS_UPDATE": {
             break;
            }
           
            case "CHANNEL_PINS_ACK": {
                break;
            }
         
            default: {
                this.client.emit("unknown", packet, this.id);
                break;
            }
         
     }
  }

  resume() {
    this.status = "resuming";
    console.log("[WS] Reconnecting...");
      this.ws.send(JSON.stringify({
         op: 6,
           d: {
            token: this.token,
            session_id: this.sessionID,
            seq: this.seq
          }
      }));
    }
}

module.exports = WSManager;
