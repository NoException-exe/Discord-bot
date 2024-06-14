import { CommandInteraction, Events } from "discord.js";
import { ExtendedClient } from "../core/client/client";
import { IEvent } from "../core/interface/event.interface";

export default class InteractionCreateEvent implements IEvent {
  public readonly name: string = Events.InteractionCreate;

  public async execute(
    interaction: CommandInteraction,
    client: ExtendedClient
  ) {
    if (!interaction.isCommand()) {
      return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("fail to execute command", error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
