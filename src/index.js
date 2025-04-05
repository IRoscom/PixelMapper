const { Bot, InputFile } = require("grammy");
const commands = require("./commands/index");
const { readFileSync } = require("fs");
const resizeImage = require("./services/resizeImage");
const convertImageToObject = require("./services/convertImageToObject");
const convertObjectToImage = require("./services/convertObjectToImage");
const isValidNonEmptyJSONString = require("./utils/isValidNonEmptyJSONString");
const getFile = require("./services/getFile");

const bot = new Bot(process.env.Token);
commands(bot);

bot.on(["message:photo", "message:document"], async (ctx) => {
  const file = await ctx.getFile();
  if (ctx.message?.document && ctx.message.document.mime_type !== "text/plain")
    return ctx.reply("Файл не является текстовым");
  const readFile = await getFile(bot.token, file.file_path);
  if (ctx.message?.photo) {
    const resize = await resizeImage(readFile);
    const pixelData = await convertImageToObject(resize);
    ctx.replyWithDocument(
      new InputFile(Buffer.from(pixelData), "pixelData.txt")
    );
  }
  if (ctx.message?.document) {
    if (!isValidNonEmptyJSONString(readFile))
      return ctx.reply("Неверные данные в файле");
    const canvas = convertObjectToImage(JSON.parse(readFile));
    if (!canvas)
      return ctx.reply(
        "Картинка не была создана. Возможно вы отправили неверный файл."
      );
    ctx.replyWithPhoto(new InputFile(canvas));
  }
});

bot.start();
