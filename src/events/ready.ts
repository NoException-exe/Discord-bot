import { Events } from 'discord.js'
import { ExtendedClient } from '../core/client/client'
import { IEvent } from '../core/interface/IEvent'

export default class ReadyEvent implements IEvent {
  public readonly name: string = Events.ClientReady

  public async execute(client: ExtendedClient) {
    console.log(`Logged in as ${client?.user?.tag}!`)
  }
}
