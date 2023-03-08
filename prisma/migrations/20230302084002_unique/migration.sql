/*
  Warnings:

  - A unique constraint covering the columns `[access_level]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_access_level_key" ON "Role"("access_level");
