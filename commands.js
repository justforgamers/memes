const discord = require("discord.js");
const fs = require("fs");

const rights = require("./rights");

// Globals
var Message = discord.Message;
var Commands = [];
var cmdPrefix = "";
var notificationChallelID = fs.readFileSync('config/notification.json', 'utf-8');

const MAX_MSG_LEN = 2000;

/**
 * Compile list of commands into one message
 * @param {Boolean} useDesc
 * @return {String} Concatenated string of command info
*/
function compileCommands(useDesc, hasRight) {
    let help_msg = 'Commands:';
    if(useDesc) {
        for(i in Commands) {        
            let cmd = Commands[i];
            if(!hasRight && cmd.permissions<2) continue;
            var title = "**" + cmd.signature + "**";
            help_msg += '\n' + title + '\t' + cmd.description;

            // If message is too long, re-compile it without descriptions
            if(help_msg.length > MAX_MSG_LEN) {
                return compileCommands(false);
            }
        }
    }
    else {
        for(i in Commands) {
            let cmd = Commands[i];
            if(!hasRight && cmd.permissions<2) continue;
            // If string becomes too long, add a '...' at the end and escape
            if((help_msg + "\n" + cmd.signature).length > (MAX_MSG_LEN - 4))
                return help_msg + "\n...";

            help_msg += "\t" + cmd.signature;
        }
        }
    return help_msg;
}

module.exports = {

    getPrefix: function()
    {
        return cmdPrefix;
    },

    setPrefix: function(prefix){
        cmdPrefix = prefix;
        console.log('Prefix has been set as :: ' + cmdPrefix);
    },

    /**
     * Help function
     * @param {Message} msg
     */
    help: function(msg) {
        let argv = msg.content;
        if (argv.length > 6) {
            argv = argv.replace(cmdPrefix + 'help', '');
            argv = argv.split(',');
            let text = "";
            for (i in argv) {
                let arg = argv[i];
                for (j in Commands) {
                    let cmd = Commands[j];
                    if (cmd.signature.replace(cmdPrefix, '') == arg.replace(cmdPrefix, '').trim()) {
                        text += "\n" + cmd.signature + " : *" + cmd.description + "*";
                    }
                }
            }
            if(text=="")
                msg.channel.send('Command not found!');
            else
                msg.channel.send(text);
        }
        else {
            // Check if no commands are registered
            if(Commands.length == 0)
                return msg.channel.send("No commands registered. Please type: `!help cmd1, cmd2, ...` cmdn's are optional");

            msg.channel.send(compileCommands(true, rights.hasRights(msg.author)<2?true:false));
        }
    },

    /**
     * Register command function
     * @param {String} sig - signature, for example !help or !version
     * @param {Function} func - function to be called when the command is entered
     * @param {Integer} perms - permission level
     * @param {String} desc - description, briefly what the command does
     * @return {Boolean} whether or not the registration was successful
    */
    reg: function(signature, func, permsLevel, desc) {
        // Check types
        Commands.forEach(function(cmd) {
            if(cmd.signature == cmdPrefix + signature) {
                console.error("Command with signature '" + cmdPrefix + signature + "' already exists");
                return false;
            }
        });
        Commands.push({
            signature: cmdPrefix + signature,
            function: func,
            permissions: permsLevel,
            description: desc
        });
        console.log("Registered command '%s'", cmdPrefix + signature);
        return true;
    },

    /**
     * Process message
     * @param {Message} msg
    */
   process: function(msg) {
    content = msg.content.toLowerCase();

        // Iterate all commands in search of a matching signature
        for (i in Commands) {
            let cmd = Commands[i];
            if(content.startsWith(cmd.signature)) {
                // Check if command has permissions, and in that case verify authority
                let r = rights.hasRights(msg.author);
                if (r > cmd.permissions)
                    return msg.reply('You must be admin to use this command');

                return cmd.function(msg);
            }
        }
        return cmd.reply('No such command registered!');
    }

}