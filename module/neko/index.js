exports.nekosearch = (chatId,resp,bot)=>{
    const axios = require("axios")
const cheerio = require("cheerio")
const respsplit = resp.split(" ").join("+")

const search = `https://nekopoi.care/?s=${respsplit}&post_type=anime`
const hlist = []
axios.get(search).then((response) => {
    const $ = cheerio.load(response.data)
    $(".result").find("ul > li").each(function (){
        let title,link;
        title = $(this).find(".top > h2").text();
        link = $(this).find(".top > h2").attr("href");
        hlist.push({
            title,
            link
        })
    })
})
bot.sendMessage(chatId, `${hlist}`);
}