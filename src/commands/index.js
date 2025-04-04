const { CommandGroup } = require("@grammyjs/commands");
/**
 *
 * @param {import('grammy').Bot} bot
 */
module.exports = async (bot) => {
  const commands = new CommandGroup();
  commands.command("start", "Запустить бота", (ctx) => {
    ctx.reply(
      "Привет👋\n" +
        "<b>Что умеет этот бот?</b>\n" +
        "Отправьте фото - и вы получите txt-файл с координатами 64×64 пикселей\n" +
        "Отправьте txt-файл - если в нём есть координаты, бот создаст изображение",
      {
        parse_mode: "HTML",
      }
    );
  });
  bot.use(commands);
  await commands.setCommands(bot);
};
