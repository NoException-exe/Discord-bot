/*
  Warnings:

  - The primary key for the `guilds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `guildId` on the `guilds` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `guilds` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Added the required column `guildOwner` to the `guilds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guilds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildOwner" INTEGER NOT NULL,
    "guildId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_guilds" ("createdAt", "guildId", "id", "members", "name", "updateAt") SELECT "createdAt", "guildId", "id", "members", "name", "updateAt" FROM "guilds";
DROP TABLE "guilds";
ALTER TABLE "new_guilds" RENAME TO "guilds";
CREATE UNIQUE INDEX "guilds_guildId_key" ON "guilds"("guildId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
