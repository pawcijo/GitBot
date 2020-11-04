const Discord = require('discord.js')
const bot = new Discord.Client();
var fs = require('fs');

const token = getToken();
var summonedUsersArray = [];
class LastThrowPerson {

    constructor(user, member, lastChannelID) {
        this._user = user;
        this._member = member;
        this._lastChannelID = lastChannelID;
    }
    set user(user) {
        this._user = user;
    }

    set member(member) {
        this._member = member;
    }

    set lastChannelID(lastChannelID) {
        this._lastChannelID = lastChannelID;
    }

    get user() {
        return this._user;
    }

    get member() {
        return this._member;
    }

    get lastChannelID() {
        return this._lastChannelID;
    }



};

bot.on('ready', () => {
    console.log("This bot tu tego !");
})

var pociski = ['beka z ciebie.', 'xDDDD', 'wciągaj gibona.', 'co ty tam gadasz pod nosem?', 'ty ruro.']

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getToken() {
    return fs.readFileSync('token.txt', 'utf8');;
}

bot.on('message', msg => {

    // if( msg.member.user.username.includes('Aw3nix')){
    //     msg.reply(pociski[getRandomInt(0,4)]);
    // }

    if (msg.content.toLowerCase() === "jaca siema") {
        msg.channel.send("Pal gume lampucaro.");
    }
    else if (msg.content.toLowerCase() === 'jaca ping') {
        msg.reply('pong');
    }
    else if (msg.content.toLowerCase() === 'jaca sayhi') {
        msg.channel.send("Hello there!");
    }
    else if (msg.content.toLowerCase() === 'jaca wypierdol') {

        //Get voice channel name of the user  
        var userChannelName = msg.member.voice.channel.name;
        //Get channel object
        var channel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
        //Get afk channel object
        var afkChannel = bot.channels.cache.find(c => c.name === 'afk' && c.type === "voice");

        var channel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
        for (const [memberID, member] of channel.members) {
            var user = member.user;
            if (member.voice.selfMute && member.voice.selfDeaf) {

                member.voice.setChannel(afkChannel)
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            } else {
                msg.channel.send(user.username + ' to kox');
            }

        };

    }
    else if (msg.content.toLowerCase() === 'jaca praca') {
        msg.channel.send("Bo kto w rusta gra ten Koks.");

        var rustChannel = bot.channels.cache.find(c => c.name === 'Rust ONLY' && c.type === "voice");
        var firstChannel = bot.channels.cache.find(c => c.name === 'Game room 1' && c.type === "voice");

        //Get voice channel name of the user  
        var userChannelName = msg.member.voice.channel.name;
        var channel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
        for (const [memberID, member] of channel.members) {
            var user = member.user;
            
            var kickUser = true;
            user.presence.activities.forEach(activity => {
                    console.log(user + " activity : "+ activity.name);
                    if(activity.name.includes('Rust')){
                        kickUser = false;
                    }
                });
           
            if (kickUser) {
                member.voice.setChannel(firstChannel)
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            } else {
                msg.channel.send(user.username + ' to kox');
            }

        };

    }
    else if (msg.content.toLowerCase() === 'jaca help') {
        msg.channel.send("Co potrafię : summon,sendback,wypierdol,siema,ping,sayhi.");
    }
    else if (msg.content.toLowerCase() === 'jaca sendback') {

        for (const lastPersonThrow of summonedUsersArray) {
            var lastUserChannel = bot.channels.cache.find(c => c.id === lastPersonThrow.lastChannelID && c.type === "voice");
            lastPersonThrow.member.voice.setChannel(lastUserChannel)
                .then(() => console.log(`Moved ${lastPersonThrow.member.user.tag}.`))
                .catch(console.error);
        }

    }
    else if (msg.content.toLowerCase() === 'jaca summon') {
        // get all users into one channel

        //clear all cached users
        summonedUsersArray = [];

        //Get voice channel name of the user  
        var userChannelName = msg.member.voice.channel.name;
        //Get channel object
        var userChannel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
        const voiceChannels = msg.guild.channels.cache.filter(c => c.type === 'voice');
        for (const [channelId, channel] of voiceChannels) {
            for (const [memberID, member] of channel.members) {
                var user = member.user;
                var throwPerson = new LastThrowPerson(user, member, member.voice.channelID);
                summonedUsersArray.push(throwPerson);
                member.voice.setChannel(userChannel)
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            };
        }
    }
    else if (msg.content.toLowerCase().includes('jaca') && msg.content.toLowerCase() != ('jaca help')) {
        msg.channel.send("Co potrafię : summon,sendback,wypierdol,siema,ping,sayhi.");
    }
    else {

    }

}

)

bot.login(token);
