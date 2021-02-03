const puppeteer = require("puppeteer");
 
async function exe(chatId,url,bot) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://yuumari.com/bypass')

setTimeout(async() => {
 await page.type("#main > div.bypass-container.svelte-1nfrc4k > div.content-main.svelte-1nfrc4k > div:nth-child(1) > div > div.src-box.svelte-1nfrc4k > textarea",url)
 await page.$eval('#main > div.bypass-container.svelte-1nfrc4k > div.content-main.svelte-1nfrc4k > div:nth-child(1) > div > div.src-box.svelte-1nfrc4k > textarea', el => el.value = url);
 await page.click("#main > div.bypass-container.svelte-1nfrc4k > div.content-main.svelte-1nfrc4k > div:nth-child(1) > div > div.nav.svelte-1nfrc4k > ul > li:nth-child(2) > button")
console.log("10")
setTimeout(async() => {
  console.log("30")
 await page.waitForSelector('#main > div.bypass-container.svelte-1nfrc4k > div.content-main.svelte-1nfrc4k > div:nth-child(2) > div > div.result.svelte-1nfrc4k > ul > li > div > div');
 const urlf = await page.$eval("main > div.bypass-container.svelte-1nfrc4k > div.content-main.svelte-1nfrc4k > div:nth-child(2) > div > div.result.svelte-1nfrc4k > ul > li > div > div", el => el.textContent);
  console.log(urlf)
  bot.sendMessage(chatId, urlf + "is the exe URL")
 await browser.close()
}, 30000);
}, 10000);

}

let cheerio = require("cheerio")
let axios = require("axios")

async function getlp(chatId,url,bot){
const res = await axios.get(url)
const cher = cheerio.load(res.data)
const lpurl = cher("#body > section > div > div > div.panel.panel-default.panel-body > div:nth-child(2) > div > div > a").attr("href")
exe(chatId,lpurl,bot)
bot.sendMessage(chatId, lpurl + "is the Linkpoi URL")
}

exports.linkpoi = async (chatId,resp,bot) =>{
getlp(chatId,resp,bot)
}

exports.exeio = async (chatId,resp,bot) =>{
exe(chatId,resp,bot)
}
