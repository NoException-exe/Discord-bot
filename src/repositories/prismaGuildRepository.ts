import { prisma } from '../prisma/prisma'
import { GuildEntity } from '../entities/guildEntity'
import { GuildRepository } from './GuildRepository'

export class PrismaGuildRepository implements GuildRepository {
  public async create(guild: GuildEntity): Promise<GuildEntity> {
    return await prisma.guild.create({ data: guild })
  }
}
