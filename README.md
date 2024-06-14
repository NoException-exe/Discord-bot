### Discord Bot V14

---

### Description

Discord bot developed using TypeScript. It is designed to handle various commands and events within a Discord server environment.

---

### Installation

To get started, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NoException-exe/Discord-bot
   cd Discord-bot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory with your Discord bot token:

   ```
   DISCORD_TOKEN_BOT=your_discord_bot_token_here
   ```

5. **Migrate Postgresql**

```bash
  npm run migrate
```

6. **Start the bot:**
   ```bash
   npm run start
   ```

---

### Start with Docker Compose

```bash
docker compose up -d
```

---

### Features

- Command handling
- Event handling
- Built-in TypeScript support for type safety and better development experience.
- Uses Discord.js library for interacting with the Discord API.

---

### Commands Example

- `/ping`: Responds with "Pong!" to check if the bot is online.

```typescript
//src/commands/utils/ping.ts

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
```

### With Params

- `/say [message]`: Responds with [message]

```typescript
src / commands / fun / say.ts

import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { ICommand } from '../../core/interface/command.interface'

export default class SayCommand implements ICommand {
  public data = new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say something')
    .addStringOption((option) =>
      option.setName('message').setDescription('The message you want to say').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

  public async execute(interaction: CommandInteraction) {
    const message = interaction.options.get('message')

    await interaction.reply({
      content: `You want to say: ${message?.value}`,
      ephemeral: true
    })
  }
}
```

### Events Example

```typescript
import { Events } from 'discord.js'
import { ExtendedClient } from '../core/client/client'
import { IEvent } from '../core/interface/event.interface'

export default class ReadyEvent implements IEvent {
  public readonly name: string = Events.ClientReady

  public async execute(client: ExtendedClient) {
    console.log(`Logged in as ${client?.user?.tag}!`)
  }
}
```

---

### Development

For development purposes, use the following npm scripts:

- `npm run dev`: Starts the TypeScript compiler in watch mode.
- `npm run build`: Compiles TypeScript files into JavaScript in the `dist/` directory.
- `npm start`: Runs the bot using the compiled JavaScript files in `dist/`.

---

Feel free to customize and extend according to your Discord bot needs!
