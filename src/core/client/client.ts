import { Client, Collection } from 'discord.js'
import { ICommand } from '../interface/ICommand'

export interface ExtendedClient extends Client {
  commands: Collection<string, ICommand>
}
