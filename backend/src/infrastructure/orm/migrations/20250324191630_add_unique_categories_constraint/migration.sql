/*
  Warnings:

  - A unique constraint covering the columns `[en_name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,en_name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_en_name_key" ON "categories"("en_name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_en_name_key" ON "categories"("name", "en_name");
