import { CommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from 'discord.js'

export interface ICommand {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  execute: (interaction: CommandInteraction) => Promise<void>
}
