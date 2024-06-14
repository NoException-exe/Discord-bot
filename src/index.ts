import { Client, Collection, GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "./core/client/client";
import { CommandHandler } from "./core/handlers/command";
import { EventHandler } from "./core/handlers/events";

class Bot extends Client implements ExtendedClient {
  public commands: Collection<string, any>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.commands = new Collection();
  }
}

const botInstance = new Bot();

//loader classes
const commandLoader = new CommandHandler(botInstance);
new EventHandler(botInstance);

botInstance.login(process.env.DISCORD_TOKEN_BOT).then(async () => {
  await commandLoader.registerCommand();
});
