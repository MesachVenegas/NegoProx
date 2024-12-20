/*
  Warnings:

  - The values [PROGRESS] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `access_token` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'CLOSED');
ALTER TABLE "Date" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Work" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Date" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Work" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Date" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "Work" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_user_id_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Date" ALTER COLUMN "cancel_at" DROP NOT NULL;

-- DropTable
DROP TABLE "VerificationToken";
