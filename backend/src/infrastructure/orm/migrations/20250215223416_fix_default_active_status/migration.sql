/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "businesses" ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isDeleted",
ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;
