class GuildManager {
    constructor(guild) {
    this._name = guild.name;
    this._icon = guild.icon;
    this._features = guild.features;
    this._id = guild.id;
    this.members = new Map();
    this.channels = new Map();
    }
    
}
