global.logger = require("./utils/logger");
const { Bot, InputFile } = require("grammy");
const commands = require("./commands/index");
const resizeImage = require("./core/resizeImage");
const convertImageToObject = require("./core/convertImageToObject");
const convertObjectToImage = require("./core/convertObjectToImage");
const getFile = require("./core/getFile");
const { nonEmptyJSONString } = require("./utils/isValid");

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
		if (!nonEmptyJSONString(readFile))
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
logger.info("Бот успешно запущен.");
