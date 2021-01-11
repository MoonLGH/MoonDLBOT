
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1520570744:AAFwU4cGxyqxRkQSsMm_arlrwGlBQGuTEa0';

const ytdl = require("ytdl-core")
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.Tok, {polling: true});
const ytcm = /\S+\/ytdl (.+)/
// Matches "/Download [whatever]"
const igdl = require("instagram-downloader")
let cheerio = require('cheerio');
let request = require('request');

bot.onText(/\/ytdl (.+)/i, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  if(ytdl.validateURL(resp) === true){
    const info = await ytdl.getBasicInfo(resp)
    console.log("ytdl command was executed " + resp)
  
    const fileOptions = {
      // Explicitly specify the file name.
      filename: info.videoDetails.title,
      // Explicitly specify the MIME type.
        contentType: 'video/mp4',
    };

    const bufs = [];
    const stream = ytdl(resp,{filter: format => format.container === 'mp4'});
    stream.on('data', function(d){ bufs.push(d); });
    stream.on('end', function(){
      bot.sendMessage(chatId, "Video Downloaded!")
      const vid = Buffer.concat(bufs);
    bot.sendVideo(chatId, vid,{},fileOptions)

    })
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, info.videoDetails.title);
  }else{
    bot.sendMessage(chatId,"Im sorry But "+`\"${resp}\"`+" Is Not An YT Video")
      
  }


});
 

let title;
let url;
let video_link;
bot.onText(/\/igdl (.+)/i, async(msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  console.log("igdl command was executed")
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever
  request(resp, async (error, response, html) => {
let $ = cheerio.load(html);
 url = $('meta[property="og:url"]').attr('content');
 title = $('meta[property="og:title"]').attr('content');
 video_link = $('meta[property="og:video"]').attr('content');
 bot.sendMessage(chatId,"Title : " + title) 
 bot.sendMessage(chatId,"Video Link : " + video_link)
const fileOptions = {filename: title,};
  const file = await request(video_link)
  // const respo = await bot.sendVideo(chatId, file)
bot.sendVideo(chatId,file, {}, fileOptions)
// bot.sendVideo(chatId,)
  })

});
bot.onText(/\/start/i, async (msg) => {
  const chatId = msg.chat.id;
  console.log("someone /start")
  bot.sendMessage(chatId, "Iya iya sono coba /igdl sama /ytdl ajg gw males bikin /start")
})
bot.onText(/\/toword (.+)/i, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever
  console.log("someone toword something")
  const { promises: fs } = require("fs");
  bot.sendDocument(chatId,docbuffer)
});
// Listen for any kind of message. There are different kinds of
// messages.
