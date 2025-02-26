/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "businesses_name_userId_key" ON "businesses"("name", "userId");
