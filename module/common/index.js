exports.start = (chatId,bot) =>{
  bot.sendMessage(chatId, "Hello .This Is MoonBot, How Can I Help You ?? \n\n /help");
}

exports.help = (chatId,bot) =>{
  bot.sendMessage(chatId, "YT \n /ytdl (Link) => Download An Video From A Link \n /searchyt (Keyword) => Search An Video From A Keyword \n /ytpl (link) => Download All Video In Youtube Playlist \n\n Zippy \n /zippy (Link) => Download An Files From ZippyShare \n /zippyurl (Link) => Give you the download link of an file");
}