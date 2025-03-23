/*
  Warnings:

  - Added the required column `svg_icon` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "svg_icon" TEXT NOT NULL;
