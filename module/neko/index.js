exports.nekosearch = (chatId,resp,bot)=>{
    const axios = require("axios")
const cheerio = require("cheerio")
const request = require("request")
const respsplit = resp.split(" ").join("+")

const search = `https://nekopoi.care/?s=${respsplit}&post_type=anime`
let hlist = []
    request(search, async (error, response, html) => {
        let $ = cheerio.load(html);
    $(".result").find("ul > li").each(function (){
        let title,link;
        title = $(this).find(".top > h2").text();
        link = $(this).find(".top > h2").attr("href");
        hlist.push({
            title,
            link
          })
        console.log(hlist)
    })
        console.log(hlist)
})
console.log(hlist)
}
