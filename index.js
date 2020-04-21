const Discord = require('discord.js')
const bot = new Discord.Client();
var fs = require('fs');

const token = getToken();

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
    if (msg.content.toLowerCase() === "siema") {
        msg.channel.send("Pal gume lampucaro.");
    }
    else if (msg.content.toLowerCase() === 'ping') {
        msg.reply('pong');
    }
    else if (msg.content.toLowerCase() === 'sayhi') {
        msg.channel.send("Hello there!");
    }

    // if( msg.member.user.username.includes('Aw3nix')){
    //     msg.reply(pociski[getRandomInt(0,4)]);
    // }

    if (msg.content.toLowerCase() === 'wypierdol') {

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

    if (msg.content.toLowerCase() === 'afk3nix') {

        //Get voice channel name of the user  
        var userChannelName = msg.member.voice.channel.name;
        //Get channel object
        var userChannel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
        const voiceChannels = msg.guild.channels.cache.filter(c => c.type === 'voice');
        for (const [channelId, channel] of voiceChannels) {
            for (const [memberID, member] of channel.members) {
                var user = member.user;
                member.voice.setChannel(userChannel)
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            };
        }
    }

})

bot.login(token);
