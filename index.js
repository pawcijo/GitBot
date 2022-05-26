const Discord = require('discord.js')
const bot = new Discord.Client();
var fs = require('fs');
const ms = require("ms");

const token = getToken();
var summonedUsersArray = [];


class LastThrowPerson {

    constructor(user, member, lastChannelID) {
        this.user_ = user;
        this.member_ = member;
        this.lastChannelID_ = lastChannelID;
    }
    set user(user) {
        this.user_ = user;
    }

    set member(member) {
        this.member_ = member;
    }

    set lastChannelID(lastChannelID) {
        this.lastChannelID_ = lastChannelID;
    }

    get user() {
        return this.user_;
    }

    get member() {
        return this.member_;
    }

    get lastChannelID() {
        return this.lastChannelID_;
    }
};


bot.on('ready', () => {
    console.log("This bot tu tego !");

    setInterval(() => {
        clear_rust();
    }, 10000);

})

function getToken() {
    return fs.readFileSync('token.txt', 'utf8');;
}

bot.on('message', msg => {
    msg = msg.content.toLowerCase();
    if (msg.content.includes("jaca")) {
        console.log("New msg : " + msg.content);
        if (msg === "jaca sayhi") {
            sayHi(msg);
        }
        else if (msg === 'jaca ping') {
            console.log("jaca ping");
            msg.reply('pong');
        }
        else if (msg === 'jaca kickafk') {
            console.log("jaca kickAfk");
            kickAfk(msg);
        }
        else if (msg === 'jaca praca') {
            console.log("jaca clear_rust");
            clear_rust();
        }
        else if (msg === 'jaca help') {
            console.log("jaca help");
            displayHelp(msg);
        }
        else if (msg === 'jaca sendback') {
            console.log("jaca sendback");
            sendBack();
        }
        else if (msg === 'jaca summon') {
            console.log("jaca summon");
            summonAll(msg);
        }
        else if (msg === 'jaca') {
            console.log("jaca");
            displayHelp(msg);
        }
        else if (msg.includes('jaca mute')) {
            console.log("jaca mute");
            if (msg.member.roles.cache.find(r => r.name === "Mod")) {
                tempMute(msg)
            }
            else {
                msg.channel.send(`Oj nie byczku nie masz moda. ;)`)
            }
        }
        else {
            console.log("Unknown commend : " + msg.content);
        }
    }

}

)

function sayHi(msg) {
    msg.channel.send("Hello " + msg.author.username + ".");
}

function sendBack() {
    for (const lastPersonThrow of summonedUsersArray) {
        var lastUserChannel = bot.channels.cache.find(c => c.id === lastPersonThrow.lastChannelID && c.type === "voice");
        lastPersonThrow.member.voice.setChannel(lastUserChannel)
            .then(() => console.log(`Moved ${lastPersonThrow.member.user.tag}.`))
            .catch(console.error);
    }

}

function summonAll(msg) {
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


function kickAfk(msg) {
    //Get voice channel name of the user  
    if (!msg.member.voice.channel) {
        msg.channel.send(msg.author.username + " gnoju zafajdany na kanał najpierw wejdź.");
        return;
    }
    var userChannelName = msg.member.voice.channel.name;
    //Get channel object
    var channel = bot.channels.cache.find(c => c.name === userChannelName && c.type === "voice");
    //Get afk channel object
    var afkChannel = bot.channels.cache.find(c => c.name.includes('afk') && c.type === "voice");

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

function displayHelp(msg) {
    msg.channel.send("Co potrafię : summon, sendback, kickAfk, ping, mute, sayhi.");
}


async function clear_rust() {

    var rustChannel = bot.channels.cache.find(c => c.name.includes('Rust ONLY') && c.type === "voice");
    var firstChannel = bot.channels.cache.find(c => c.name.includes('Game room 1') && c.type === "voice");

    //Get voice channel name of the user  
    for (const [memberID, member] of rustChannel.members) {
        var user = member.user;

        var kickUser = true;
        user.presence.activities.forEach(activity => {
            console.log(user + " activity : " + activity.name);
            if (activity.name.includes('Rust')) {
                kickUser = false;
            }
        });

        if (kickUser) {
            member.voice.setChannel(firstChannel)
                .then(() => console.log(`Moved ${member.user.tag}.`))
                .catch(console.error);
        } else {
        }

    };

}


function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return bot.users.cache.get(mention);
    }
}

function MemberFromUserId(Id, msg) {
    return msg.guild.members.fetch(Id)
        .catch(console.error);
}


/**
 * @param {Discord.Message} msg message
 */
function tempMute(msg) {
    //[0]   [1]     [2]    [3]
    //jaca mutuj @Nawros time

    let msgContent = msg.content;
    let msgFix = msg.content.replace("  ", " ");
    let args = msgFix.split(' ');
    let stringWithoutTime = args[0] + " " + args[1] + " " + args[2] + " ";
    let time = args[3]

    var person = getUserFromMention(args[2]);
    if (!person) {
        return msg.reply("Nie ma takiego usera: " + person)
    }
    else {
        var member = MemberFromUserId(person.id, msg);

        const voiceChannels = msg.guild.channels.cache.filter(c => c.type === 'voice');
        for (const [channelId, channel] of voiceChannels) {
            for (const [memberID, member] of channel.members) {
                var user = member.user;
                if (user === person) {

                    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                        time
                    );

                    if (!match) {
                        msg.channel.send(`${time} nie określa  przedziału czasu. ( np 15s, 2h, 30m,)`)
                        return;
                    }
                    else {
                        member.voice.setMute(true);
                        msg.channel.send(`@${person.tag} dostał legancko mute na  ${time}`)
                    }

                    setTimeout(function () {
                        member.voice.setMute(false);


                        if (!match) {
                            msg.channel.send(`@${person.tag} dostał legancko unmute.`);
                        }
                        else {
                            msg.channel.send(`@${person.tag} dostał legancko unmute.`)
                        }
                    }, getTime(time));
                    return;
                };
            }
        }
    }

}

function getTime(time) {
    try {
        return ms(time);
    }
    catch (error) {
        console.log(time + "is not legit");
    }
}




bot.login(token);
