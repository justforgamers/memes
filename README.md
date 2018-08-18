# Pizze
Pizze is a memer bot for discord server

## Dependencies
- Node.js

## Node Packages
- [discord.js](https://discord.js.org/)
- [fs](https://www.npmjs.com/package/fs)
- [jimp](https://github.com/oliver-moran/jimp)


**Note:: you can run 'install.bat' in windows to install the node package**

## Files needed:
First of all, you need to create a folder called config, and add to it the following files: A file called "config.json" which contains the following:
`json
{ 
	"bot_token":"wzc02uaFw2SC9u1aMhaJ5RQP.DIqchQ.fir6VJJ4zO1cCNeLnvNMKwW9yCY",
	"bot_prefix":"!"
}
`
Next, you'll need to set yourself permission to use the bot's commands like !block or !unblock, to do that you simply create a file called "rights.json"(still in the config folder). Syntax:
`json
{
	"owners":["id1", "id2"],
	"admins":["id3", "id4"]
}
`

## Starting the bot
To start the bot, open a command terminal in the directory of the main.js file and simply write `node main.js`. Alternatively you can run the `run.bat` in Windows
