const TelegramBot = require('node-telegram-bot-api');
const handler = require("./handler/handler.js")
const bot = new TelegramBot(process.env.TELEGRAMKEY, {polling: true});
bot.onText(/\/zippy (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
handler.zippy.zippy(chatId,resp,bot)
});
bot.onText(/\/ytdl (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 
  handler.yt.ytdl(chatId,resp,bot)
});
 
bot.onText(/\/searchyt (.+)/i, async(msg, match) => {
  console.log("searchyt command was executed")
  const chatId = msg.chat.id;
  const resp = match[1];
  handler.yt.searchyt(chatId,resp,bot)
});
bot.onText(/\/ytpl (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  handler.yt.ytpl(chatId,resp,bot)
});

bot.onText(/\/help/i, async (msg, match) => {
  const chatId = msg.chat.id;
  handler.common.help(chatId,bot)
})
bot.onText(/\/start/i, async (msg, match) => {
  const chatId = msg.chat.id;
  handler.common.start(chatId,bot)
})

bot.onText(/\/nekosearch (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  handler.neko.nekosearch(chatId,resp,bot)
});
