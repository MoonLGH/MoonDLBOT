exports.nekosearch = (chatId,resp,bot)=>{
    const axios = require("axios")
const cheerio = require("cheerio")
const request = require("request")
const respsplit = resp.split(" ").join("+")

const search = `https://nekopoi.care/?s=${respsplit}&post_type=anime`
let hlist = []
        let title,link;
    request(search, async (error, response, html) => {
        let $ = cheerio.load(html);
    $(".result").find("ul > li").each(function (){
        title = $(this).find(".top > h2").text();
        link = $(this).find(".top > h2").attr("href");
        hlist.push({
            title,
            link
          })
        console.log(title , link)
    })
        console.log(hlist)
                console.log(title , link)
})
console.log(hlist)
        console.log(title , link)
}
