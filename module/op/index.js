var request = require("request")
const cheerio = require("cheerio")
const url = "https://oploverz.in"
const Axios = require("axios")


async function home(){
    const jar = request.jar()
    var request = request.defaults({jar:jar})
    console.log("home")
     var options = {
      url : url,
      timeout: 300000 //set waiting time till 10 minutes.
    }
    request(options, async (error, response, html) => {
        let $ = cheerio.load(html);
        console.log(html)
        $("#content > div.postbody > div > div > div.lts").find("ul > li")
        .each(function () {
          eps = $(this).find("div.dtl > h2 > a").text()
          link = $(this).find("div.dtl > h2 > a").attr("href")
          tgl = $(this).find("div.dtl > span:nth-child(3)").text()
          console.log("Title = " + eps)
          console.log("Link = "+ link)
          console.log("Tanggal = " + tgl)
          console.log()
        });
    })
}

async function eps(url){
  console.log("working on it")
  const req = await Axios.get(url)
  let $ = cheerio.load(req.data);
 $("#op-single-post > div.epsc").find('.soraddl').each(function(){
   $(this).find(".title-download").each(function(){
     title = $(this).text()
   })
$(this).find("a").each(function(){
zippy = $(this).attr("href")
if(!zippy.includes("zippyshare.com")){
}else{
  console.log(title)
console.log(zippy)
}
  })

})
}

async function ongoing(){
  console.log("working on it")
  const req = await Axios.get("https://www.oploverz.in/ongoing-series/")
  let $ = cheerio.load(req.data);

  $("#content > div.postbody > div").find("ul > li").each(function(){
    //title
  title = $(this).find("h2 > a").text()
  link =  $(this).find("h2 > a").attr("href")
console.log(title , "\n",link)

//genre
 genre = $(this).find("span:nth-child(4)").text()
console.log(genre)
console.log()
})
}

exports.home = async (chatId,bot) =>{    
    home()
}
exports.ongoing = async (chatId,bot) =>{    
    ongoing()
}
exports.eps = async (chatId,resp,bot) =>{    
    eps(resp)
}
