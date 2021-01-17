
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1520570744:AAFwU4cGxyqxRkQSsMm_arlrwGlBQGuTEa0';

const ytdl = require("ytdl-core")
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.Tok, {polling: true});
const ytcm = /\S+\/ytdl (.+)/
// Matches "/Download [whatever]"


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
bot.onText(/\/igdl (.+)/, async(msg, match) => {
const request = require("request")
const cheerio = require("cheerio")
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  console.log("igdl command was executed")
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever
//  request("https://www.instagram.com/p/CIFePJ2ATBk/?utm_source=ig_web_copy_link/", async function(error, response, html){
// let $ = cheerio.load(html);
//  url = $('meta[property="og:url"]').attr('content');
//  title = $('meta[property="og:title"]').attr('content');
//  video_link = $('meta[property="og:video"]').attr('content');
//  bot.sendMessage(chatId,"Title : " + title) 
//  bot.sendMessage(chatId,"Video Link : " + video_link)
//     const fileOptions = {
//       // Explicitly specify the file name.
//       filename: title,
//       // Explicitly specify the MIME type.
//     };
//   const file = await request(video_link)
// bot.sendVideo(chatId,file, {}, fileOptions)

//   }, console.log("cb"))
// console.log(resp)
  const axios =require("axios")

axios.get(resp).then(respon =>{
console.log(respon.data)
})
console.log()

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

bot.onText(/\/ytpl (.+)/i, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever
  var ytpl = require('ytpl');
  var fs = require('fs');
  
  const ytdl = require("ytdl-core")
  let ytplurl;
  let playlist
  let judul;
  async function abc(){
   playlist = await ytpl(resp);
  
  
  const pli = playlist.items
  
  judul = playlist.title.replace(/[/\\?%*:|"<>]/g, '-');
  
      fs.mkdirSync("./"+ judul)

  let lenght = playlist.estimatedItemCount
  pli.forEach(async (item)=>{ 
  
  const vidname = await ytdl.getBasicInfo(item.shortUrl);
  console.log(item.shortUrl)
  var filename = vidname.videoDetails.title
  
  filename = filename.replace(/[/\\?%*:|"<>]/g, '-');
  
      ytdl(item.shortUrl)
      .pipe(fs.createWriteStream("./"+ judul +"/"+ filename + '.mp4')).on("finish", ()=>{
         console.log(vidname.videoDetails.title + " done")
         lenght -= 1
         console.log(lenght)
         if(lenght == 0){
             zip()
      }
      })
  
   })
  
  }
  abc()
  
  function zip(){
  var archiver = require('archiver');
  
  var output = fs.createWriteStream(judul +'.zip');
  var archive = archiver('zip');
  
  output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      const fse = require("fs-extra")
      // fse.removeSync("./"+ judul)
      bot.sendDocument(chatId,"./"+ judul +".zip")
      removezip()
  });
  
  archive.on('error', function(err){
      throw err;
  });
  
  archive.pipe(output);
  
  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory("./"+ judul, false);
  
  
  archive.finalize();
  }
  function removezip(){
      const fse = require("fs-extra")
      fse.removeSync("./"+judul +".zip")
      fse.removeSync("./"+ judul)
  
  }
});
