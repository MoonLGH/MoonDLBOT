// calm this zippy dl will be an massive code
let bot;
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
  
  
  async function send(file,id){
          const files = _fs.createReadStream("./"+file)
          bot.sendDocument(id,files)
  }
  
exports.zippy = async (chatId,resp,bots) =>{    
bot = bots
    abc(resp)


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
    const files = _fs.createReadStream("./"+filename)
    
           
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
           loadbar.stop()
              file.close()   
            send(filename,chatId)
          })
          res.on('error', _ => {
              loadbar.stop()
              console.log('❎  ' + _colors.green('Error Download File : ' + filename))
              bot.sendMessage(chatId, "Error")
          })
      }
    })
    }
}

exports.zippyurl = async (chatId,resp,bots) =>{    
    url(resp)
    
    async function url(u){
    const url = await GetLink(u)
    
    if (url.error == true) {
      console.log(_colors.bgRed(_colors.white(' ' + url.message + ' ')))
                     bot.sendMessage(chatId, "Error")
      return null
    }else{
              bot.sendMessage(chatId, "The ZippyDL url is " + url.url)
    }  
        
   }
    }
