import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { ICommand } from "../../core/interface/command.interface";

export default class SayCommand implements ICommand {
  public data = new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say something")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to say")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

  public async execute(interaction: CommandInteraction) {
    const message = interaction.options.get("message");

    await interaction.reply({
      content: `You want to say: ${message?.value}`,
      ephemeral: true,
    });
  }
}
