/*
  Warnings:

  - You are about to drop the column `svg_icon` on the `categories` table. All the data in the column will be lost.
  - Added the required column `icon` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "svg_icon",
ADD COLUMN     "icon" TEXT NOT NULL;
