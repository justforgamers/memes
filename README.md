# Pizze
Pizze is a memer bot for discord server

Here's a example of how the memes work (i.e by placing user's display profile in the meme)

[Example Image](example.png)

## Dependencies
- Node.js

## Node Packages
- [discord.js](https://discord.js.org/)
- [fs](https://www.npmjs.com/package/fs)
- [jimp](https://github.com/oliver-moran/jimp)


**Note:: you can run 'install.bat' in windows to install the node package**

## Files needed:
First of all, you need to create a folder called config, and add to it the following files: A file called "config.json" which contains the following:
```json
{ 
	"bot_token":"wzc02uaFw2SC9u1aMhaJ5RQP.DIqchQ.fir6VJJ4zO1cCNeLnvNMKwW9yCY",
	"bot_prefix":"!"
}
```
Next, you'll need to set yourself permission to use the bot's commands like !block or !unblock, to do that you simply create a file called "rights.json"(still in the config folder). Syntax:
```json
{
	"owners":["id1", "id2"],
	"admins":["id3", "id4"]
}
```


## Starting the bot
To start the bot, open a command terminal in the directory of the main.js file and simply write `node main.js`. Alternatively you can run the `run.bat` in Windows


## Adding custom memes
- First add your custom image in the `meme` directory name, give a suitable name to the filename, the **file format must be png**
- The in the file `meme.js` at the end add:
 ```js
 addMeme('filename', [fx, fy], [fw, fh], [sx, sy], [sw, sh]);
 ```
 where,

 - 'filename': the name of your file
 - [fx, fy]: x, y co-odrinate for the first mentioned user
 - [fw, fh]: width and height for the first user image to be replaced
 - [sx, sy]: x, y co-odrinate for the second mentioned user, this is optional
 - [sw, sh]: width and height for the second user image to be replaced, if the [sx, sy] is not given this should not be entered

 - To add user name to the image use following:
 ```js
addNameMeme('filename', [x, y]);
 ```
 where,

 - 'filename': the name of your file
 - [fx, fy]: x, y co-odrinate where the name should be placed