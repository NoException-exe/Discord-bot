import { Collection, REST, Routes } from "discord.js";
import { pathToFileURL } from "url";
import { ExtendedClient } from "../client/client";
import { ICommand } from "../interface/command.interface";

import fs from "node:fs";
import path from "node:path";

export class CommandHandler {
  private client: ExtendedClient;
  private commands: Collection<string, ICommand>;

  constructor(client: ExtendedClient) {
    this.client = client;
    this.commands = this.client.commands;
    this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const foldersPath = path.join(__dirname, "../../commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const fileUrl = pathToFileURL(filePath).toString();

        try {
          const commandModule = (await import(fileUrl)).default;
          const commandHandler = new commandModule(this.client) as ICommand;

          if (this.isValidCommand(commandHandler)) {
            this.commands.set(commandHandler.data.name, commandHandler);
            console.log(`[COMMAND] ${commandHandler.data.name} loaded.`);
          } else {
            console.log(
              `[WARNING] The command at ${filePath} is missing or invalid.`
            );
          }
        } catch (err) {
          console.error(`Failed to load command at ${filePath}:`, err);
        }
      }
    }
  }

  private isValidCommand(command: ICommand): command is ICommand {
    return (
      command &&
      typeof command.data === "object" &&
      typeof command.data.name === "string" &&
      typeof command.execute === "function"
    );
  }

  public async registerCommand(): Promise<void> {
    const commandData = this.commands.map((command) => command.data);

    const rest = new REST().setToken(process.env.DISCORD_TOKEN_BOT!);

    if (!this.client.user) {
      console.error("Could not register commands, client.user is undefined");
      return;
    }

    try {
      console.log(
        "[REGISTER] Started refreshing global application (/) commands."
      );

      await rest.put(Routes.applicationCommands(this.client.user.id), {
        body: commandData,
      });
      console.log(
        '"[REGISTER] Successfully reloaded global application (/) commands.'
      );
    } catch (err) {
      console.error("Error while registering commands:", err);
    }
  }
}
