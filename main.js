const Discord = require("discord.js");
const fs = require("fs");

// Globals
const bot = new Discord.Client();

var onReady = false;
var botConfig = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
var botToken = botConfig.bot_token;
var botPrefix = botConfig.bot_prefix;

//
// Disconnect the bot when the program is terminated
//
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function() {
    console.log("Disconnecting bot..")
    // Destructor, save bot state / other required data
    bot.destroy();
    process.exit();
});

//
// Load modules when bot is logged in
//
bot.on("ready", () => {
    if(onReady){
        console.log("Reconnected!");
        return;
    }

    console.log('Connected!');
    console.log("Bot name: " + bot.user.username);
    console.log("Bot id: " + bot.user.id);

    /*
        You can load all the commands here i.e. before loading commands,
        in order to load these commands without using the given prefix
    */

    // Load the commands to register the prefix
    //commands.setPrefix(botPrefix);

    // Register all commands with given prefix
    onReady = true;
});

//
//Greet new members
//
bot.on('guildAddMember', member => {
    member.send(`Welcome to the server, ${member}`)
});

//
// Process bot message
//
bot.on('message', msg => {
    // Don't process if the message is from a bot
    if (msg.author.bot)
        return;

    if(msg.content == botPrefix + 'ping')
        msg.reply('pong');

    //commands.process(msg);
});

// Log in bot client
bot.login(botToken);