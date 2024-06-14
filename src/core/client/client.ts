import { Client, Collection } from 'discord.js'
import { ICommand } from '../interface/command.interface'

export interface ExtendedClient extends Client {
  commands: Collection<string, ICommand>
}
