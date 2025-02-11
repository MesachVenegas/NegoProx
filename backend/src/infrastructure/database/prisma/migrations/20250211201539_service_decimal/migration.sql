/*
  Warnings:

  - You are about to drop the column `dateId` on the `messages` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `dateId` on the `works` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `works` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_dateId_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_dateId_fkey";

-- DropIndex
DROP INDEX "works_dateId_key";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "dateId",
ADD COLUMN     "appointmentId" TEXT;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "works" DROP COLUMN "dateId",
ADD COLUMN     "appointmentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "works_appointmentId_key" ON "works"("appointmentId");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
