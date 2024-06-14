import { Guild, Events } from 'discord.js'
import { ExtendedClient } from '../core/client/client'
import { IEvent } from '../core/interface/IEvent'
import { PrismaGuildRepository } from '../repositories/prismaGuildRepository'
import { GuildEntity } from '../entities/guildEntity'

export default class GuildCreateEvent implements IEvent {
  public readonly name: string = Events.GuildCreate
  private readonly prismaGuildRepository = new PrismaGuildRepository()

  public async execute(guild: Guild, client: ExtendedClient) {
    const guildData: GuildEntity = {
      guildId: guild.id,
      name: guild.name,
      members: guild.memberCount,
      guildOwner: guild.ownerId
    }
    await this.prismaGuildRepository.create(guildData)

    console.log('[GUILD] Created new guild: ' + guild.name)
  }
}
