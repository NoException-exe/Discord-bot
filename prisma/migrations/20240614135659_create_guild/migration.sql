-- CreateTable
CREATE TABLE "guilds" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guildId_key" ON "guilds"("guildId");
