
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather

const ytdl = require("ytdl-core")
const bot = new TelegramBot(process.env.TELEGRAMKEY, {polling: true});
const ytcm = /\S+\/ytdl (.+)/
// calm this zippy dl will be an massive code
const clacSize = (a, b) => {
  if (0 == a) return "0 Bytes";
  var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }
  const _proggers = require('cli-progress'),
_colors = require('colors'),
_fs = require('fs'),
_$ = require('cheerio'),
_url = require('url'),
_https = require('https'),
_axios = require('axios'),
_math = require('mathjs');

bot.onText(/\/zippy (.+)/i, async (msg, match) => {
  
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  abc(resp)


async function GetLink(u) {
console.log('⏳  ' + _colors.yellow(`Get Page From : ${u}`))
const zippy = await _axios({ method: 'GET', url: u }).then(res => res.data).catch(err => false)
console.log('✅  ' + _colors.green('Done'))
const $ = _$.load(zippy)
if (!$('#dlbutton').length) {
  return { error: true, message: $('#lrbox>div').first().text().trim() }
}
console.log('⏳  ' + _colors.yellow('Fetch Link Download...'))
const url = _url.parse($('.flagen').attr('href'), true)
const urlori = _url.parse(u)
const key = url.query['key']
let time;
let dlurl;
try {
  time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
  dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'
} catch (error) {
  time = _math.evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
  dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
}
console.log('✅  ' + _colors.green('Done'))
return { error: false, url: dlurl }
}

async function cb(u){
const url = await GetLink(u)

const req = await _https.get(url.url)

await req.on('response', res => {
          filename = decodeURIComponent(res.headers['content-disposition'].match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/)[1])

})

const fs = require(“fs”)
const files =fs.createReadStream("./"+filename)

        bot.sendDocument(chatId,files)
}
async function abc(u){
const url = await GetLink(u)

if (url.error) {
  console.log(_colors.bgRed(_colors.white(' ' + url.message + ' ')))
  return null
}
const req = await _https.get(url.url)
console.log('🎁  ' + _colors.yellow('Start Download From URL : ' + url.url))
console.log('⏳  ' + _colors.yellow('Waiting Server Response...'));
await req.on('response', res => {
  if (!res.headers['content-disposition']) {
      console.log('🔁  ' + _colors.blue('Server Download Error, Try To Get New Link...'))
      abc(u)
  } else {
      console.log('✅  ' + _colors.green('Server Response'))
      const size = parseInt(res.headers['content-length'], 10),
          filename = decodeURIComponent(res.headers['content-disposition'].match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/)[1])
      let currentSize = 0
      console.log('☕  ' + _colors.yellow('Start Downloading File : ' + filename))
      const file = _fs.createWriteStream(filename)
      res.pipe(file)
      const loadbar = new _proggers.Bar({
          format: 'Downloading ' + _colors.green('{bar}') + ' {percentage}% | {current}/{size} | ETA: {eta}s | Speed: {speed}',
          barsize: 25
      }, _proggers.Presets.shades_classic)
      loadbar.start(size, 0, {
          size: clacSize(size, 3),
          current: clacSize(currentSize, 3),
          speed: 0
      })
      res.on('data', c => {
          currentSize += c.length;
          loadbar.increment(c.length, {
              speed: clacSize(c.length),
              current: clacSize(currentSize, 3)
          })
      })
      res.on('end', _ => {
          console.log('✅  ' + _colors.green('Success Download File : ' + filename))
          bot.sendMessage(chatId,"Download Success")
          bot.sendMessage(chatId,filename)
cb(u)
          loadbar.stop()
          file.close()
      })
      res.on('error', _ => {
          loadbar.stop()
          console.log('❎  ' + _colors.green('Error Download File : ' + filename))
          bot.sendMessage(chatId, "Error")
      })
  }
})
}

});

//zippy end
let baseUrl = "https://otakudesu.tv/"
const axios = require("axios")
const cheerio = require("cheerio")
bot.onText(/\/otakudesuhome/i, async(msg) => {
  console.log("someone /od")
let on_going = []
  const request = require("request")
const cheerio = require("cheerio")
request(baseUrl, async (error, response, html) => {
        const $ = cheerio.load(html);
  console.log(html)
        $(".venz").children()
          .eq(0)
          .find("ul > li")
          .each(function () {
            let episode, uploaded_on, day_updated, thumb, title, link, id;
            $(this)
              .find(".thumb > a")
              .filter(function () {
                title = $(this).find(".thumbz > h2").text();
              });
            on_going.push({title})
            return console.log(on_going)
        })
            return console.log(on_going)
      })
})

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
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "match 1"
const axios = require("axios")
 setTimeout(() => {
     console.log("igdl command was executed")
axios.get(resp).then(respon =>{
let $ = cheerio.load(respon.data);
url = $('meta[property="og:url"]').attr('content');
title = $('meta[property="og:title"]').attr('content');
// console.log(respon.data)
video_link = $('meta[property="og:video"]').attr('content');
console.log(url)
console.log(title)
console.log(video_link)
console.log("axios")
console.log(respon.data)
})
 }, 5000);

});
bot.onText(/\/start/i, async (msg) => {
  const chatId = msg.chat.id;
  console.log("someone /start")
  bot.sendMessage(chatId, "Iya iya sono coba /igdl sama /ytdl ajg gw males bikin /start")
})
let vid0
let vid1
let vid2
bot.onText(/\/searchyt (.+)/i, async(msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  console.log("searchyt command was executed")
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever
  const ytsr = require('ytsr');
  let availableFilters = await ytsr.getFilters(resp);
  let filter = availableFilters.get('Type').get('Video');
  let searchResults = await ytsr(filter.url, { limit: 3 });
  let video = searchResults;
  if (!video) bot.sendMessage(chatId, `Aku Tidak Menemukan apapun`);
  else{
        vid0 = video.items[0]
      
      console.log('title = ' + vid0.title)
      console.log('channel = ' + vid0.author.name)
      console.log('Duration = ' + vid0.duration) 
      console.log('Views = ' + vid0.views) 
      console.log('URL = ' + vid0.url) 
      console.log()

const keyboard0 = bot.
InlineKeyboardMarkup = {
  inline_keyboard : [[]],
}
keyboard0.inline_keyboard[0].push({
  text: "DOWNLOAD", callback_data : "dl1"
})
  bot.sendMessage(chatId, `Title : ${vid0.title} \n Channel : ${vid0.author.name} \n Duration : ${vid0.duration} \n Views : ${vid0.views} \n URL : ${vid0.url}`,{
    reply_markup : keyboard0     
  });

  vid1 = video.items[1]
      
console.log('title = ' + vid1.title)
console.log('channel = ' + vid1.author.name)
console.log('Duration = ' + vid1.duration) 
console.log('Views = ' + vid1.views) 
console.log('URL = ' + vid1.url) 
console.log()

const keyboard1 = bot.
InlineKeyboardMarkup = {
inline_keyboard : [[]],
}
keyboard1.inline_keyboard[0].push({
text: "DOWNLOAD", callback_data : "dl2"
})
bot.sendMessage(chatId, `Title : ${vid1.title} \n Channel : ${vid1.author.name} \n Duration : ${vid1.duration} \n Views : ${vid1.views} \n URL : ${vid1.url}`,{
reply_markup : keyboard1  
});

vid2 = video.items[2]
      
console.log('title = ' + vid2.title)
console.log('channel = ' + vid2.author.name)
console.log('Duration = ' + vid2.duration) 
console.log('Views = ' + vid2.views) 
console.log('URL = ' + vid2.url) 
console.log()

const keyboard2 = bot.
InlineKeyboardMarkup = {
inline_keyboard : [[]],
}
keyboard2.inline_keyboard[0].push({
text: "DOWNLOAD", callback_data : "dl3"
})
bot.sendMessage(chatId, `Title : ${vid2.title} \n Channel : ${vid2.author.name} \n Duration : ${vid2.duration} \n Views : ${vid2.views} \n URL : ${vid2.url}`,{
reply_markup : keyboard2
});


  //CB

      console.log()




  }


});
let link
  bot.on("callback_query", (query) =>{
    const { data } = query;
    switch(data){
      case "dl1":{
        link = vid0.url
        break
      }case "dl2":{
        link = vid1.url
        break
      }case "dl3":{
        link = vid2.url
        break
      }
    }
    bot.sendMessage(chatId,`You've Pick ${link}`)
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
