/*
  Warnings:

  - The `day_of_week` column on the `availabilities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "availabilities" DROP COLUMN "day_of_week",
ADD COLUMN     "day_of_week" TEXT[];

-- CreateIndex
CREATE INDEX "availabilities_day_of_week_idx" ON "availabilities"("day_of_week");

-- CreateIndex
CREATE INDEX "verifications_token_used_idx" ON "verifications"("token", "used");
