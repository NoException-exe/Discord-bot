import { GuildEntity } from '../entities/guildEntity'

export abstract class GuildRepository {
  public abstract create(guild: GuildEntity): Promise<GuildEntity>
}
