/*
  Warnings:

  - You are about to drop the column `password_hash` on the `accounts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_phone_idx";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "password_hash";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;
