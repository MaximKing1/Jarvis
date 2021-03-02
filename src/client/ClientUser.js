class ClientUser {
    constructor() {
        this.username,      //string
        this.discriminator, //string
        this.verified,      //boolean
        this.id,            //string
        this.flags,         //number
        this.email,         //string
        this.bot,           //boolean
        this.avatar         //string
    }
}

module.exports = ClientUser;