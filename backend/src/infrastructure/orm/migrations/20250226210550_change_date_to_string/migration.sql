/*
  Warnings:

  - Changed the type of `day_of_week` on the `availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "availabilities" ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT,
DROP COLUMN "day_of_week",
ADD COLUMN     "day_of_week" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "availabilities_day_of_week_idx" ON "availabilities"("day_of_week");
