let srcd = false
let ytdl = require("ytdl-core")
exports.ytdl = async (chatId,resp,bot) =>{
  let args = resp.split(" ")

    if(ytdl.validateURL(args[0]) === true){
  let info = await ytdl.getBasicInfo(resp)

      console.log("ytdl command was executed " + resp)
      let fileOptions = {
        filename: info.videoDetails.title,
      };
  let bufs = [];
  let stream = ytdl(resp,{filter: format => format.container === 'mp4'});
  stream.on('data', function(d){ bufs.push(d); });
  stream.on('end', function(){
    bot.sendMessage(chatId, "Video Downloaded!")
    let vid = Buffer.concat(bufs);
  bot.sendVideo(chatId, vid,{},fileOptions)
  })
  bot.sendMessage(chatId, info.videoDetails.title);
}else{
  let info = await ytdl.getBasicInfo(args[1])

  console.log("ytdl command was executed " + args[1] + "in else")
  let fileOptions = {
    filename: info.videoDetails.title,
  };
  if(args[0] == "hq"){
    let bufs = [];
    let stream = ytdl(args[1],{filter: format => format.container === 'mp4', quality: 'highestvideo',});
    stream.on('data', function(d){ bufs.push(d); });
    stream.on('end', function(){
      bot.sendMessage(chatId, "Video Downloaded! (High Quality)")
      let vid = Buffer.concat(bufs);
    bot.sendVideo(chatId, vid,{},fileOptions)
    })
  }else if(args[0] == "ha"){
    let bufs = [];
    let stream = ytdl(args[1],{filter: format => format.container === 'mp4', quality: 'highestaudio',});
    stream.on('data', function(d){ bufs.push(d); });
    stream.on('end', function(){
      bot.sendMessage(chatId, "Video Downloaded! (High Audio)")
      let vid = Buffer.concat(bufs);
    bot.sendVideo(chatId, vid,{},fileOptions)
    })
  }else{
  bot.sendMessage(chatId,"Im sorry But "+`\"${resp}\"`+" Is Not An YT Video")
  }
}
}
exports.searchyt = async (chatId,resp,bot) =>{
    let ytsr = require('ytsr');
  let availableFilters = await ytsr.getFilters(resp);
  let filter = availableFilters.get('Type').get('Video');
  let searchResults = await ytsr(filter.url, { limit: 3 });
  let video = searchResults;
  if (!video) bot.sendMessage(chatId, `Aku Tidak Menemukan apapun`);
  else{
if(srcd == false){
video.items.forEach(vid => {
    bot.sendMessage(chatId, `Title : ${vid.title} \n Channel : ${vid.author.name} \n Duration : ${vid.duration} \n Views : ${vid.views} \n URL : ${vid.url}`,{
      });
    console.log('title = ' + vid.title)
    console.log('channel = ' + vid.author.name)
    console.log('Duration = ' + vid.duration) 
    console.log('Views = ' + vid.views) 
    console.log('URL = ' + vid.url) 
    console.log()
});
        srcd = true
setTimeout(()=>{
srcd = false
},500)
      console.log()
}else if(srcd == true){
bot.sendMessage(chatId, `Cooldown 0.5 detik gan`);
  }
}
}

exports.ytpl = async (chatId,resp,bot) =>{
    var ytpl = require('ytpl');
    var fs = require('fs');
    
    let ytdl = require("ytdl-core")
    let playlist
    let judul;
    async function abc(){
     playlist = await ytpl(resp);
    let pli = playlist.items
    judul = playlist.title.replace(/[/\\?%*:|"<>]/g, '-');
        fs.mkdirSync("./"+ judul)
    let lenght = playlist.estimatedItemCount
    pli.forEach(async (item)=>{ 
    let vidname = await ytdl.getBasicInfo(item.shortUrl);
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
        let fse = require("fs-extra")
        bot.sendDocument(chatId,"./"+ judul +".zip")
        removezip()
    });
    
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    archive.directory("./"+ judul, false);
    archive.finalize();
    }
    function removezip(){
        let fse = require("fs-extra")
      setTimeout(()=>{
        fse.removeSync("./"+judul +".zip")
        fse.removeSync("./"+ judul)
      },10000)
      }
}
