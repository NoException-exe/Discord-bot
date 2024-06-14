export abstract class GuildEntity {
  public abstract id?: number
  public abstract guildOwner: string
  public abstract guildId: string
  public abstract name: string
  public abstract members: number
  public abstract createdAt?: Date
  public abstract updateAt?: Date
}
