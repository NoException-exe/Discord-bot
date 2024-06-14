import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { ICommand } from '../../core/interface/command.interface'

export default class PingCommand implements ICommand {
  public data: SlashCommandBuilder = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!')

  public async execute(interaction: CommandInteraction) {
    await interaction.reply({
      content: `Pong! ${interaction.client.ws.ping}ms 🏓`,
      ephemeral: true
    })
  }
}
