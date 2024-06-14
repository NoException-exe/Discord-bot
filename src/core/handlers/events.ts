import { ExtendedClient } from "../client/client";
import { pathToFileURL } from "url";
import { IEvent } from "../interface/event.interface";

import fs from "node:fs";
import path from "node:path";

export class EventHandler {
  private client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
    this.loadEvents();
  }

  private async loadEvents(): Promise<void> {
    const eventsPath = path.join(__dirname, "../../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const fileUrl = pathToFileURL(filePath).toString();

      try {
        const { default: EventClass } = (await import(fileUrl)).default;
        const eventHandler = new EventClass(this.client);

        if (this.isValidEventHandler(eventHandler)) {
          this.registerEventHandler(eventHandler);
          console.log(`[EVENT] ${eventHandler.name} loaded.`);
        } else {
          console.log(
            `[WARNING] The event handler at ${filePath} is missing a required "name" or "execute" property.`
          );
        }
      } catch (err) {
        console.error(`Failed to load event handler at ${filePath}:`, err);
      }
    }
  }

  private isValidEventHandler(handler: IEvent): handler is IEvent {
    return (
      typeof handler.name === "string" && typeof handler.execute === "function"
    );
  }

  private registerEventHandler(handler: IEvent) {
    this.client.on(handler.name, (...args) =>
      handler.execute(...args, this.client)
    );
  }
}
