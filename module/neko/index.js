exports.nekosearch = async (chatId,resp,bot)=>{
    const cheerio = require("cheerio")
    const respsplit = resp.replace(" ", "+")
    const cloudflareScraper = require('cloudflare-scraper');
    const search = `https://nekopoi.care/?s=${respsplit}&post_type=anime`
    const hlist = []

    bot.sendMessage(chatId, "Sabar, Sedang Membobol Cloudflarenya kucing :3")
    console.log(search)
        const response = await cloudflareScraper.get(search)
    
    const $ = cheerio.load(response)
        
        $(".result").find("ul > li").each(function (){
            let title,link;
            title = $(this).find(".top > h2").text();
            link = $(this).find(".top > h2 > a").attr("href");
            hlist.push({
                title,
                link
              })
        })

hlist.forEach(ele => {
bot.sendMessage(chatId, `Title = ${ele.title} \n Link = ${ele.link}`);
});
}