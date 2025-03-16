/*
  Warnings:

  - A unique constraint covering the columns `[businessId,day_of_week]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId,day_of_week,serviceId]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "availabilities_businessId_day_of_week_key" ON "availabilities"("businessId", "day_of_week") WHERE "serviceId" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "availabilities_businessId_day_of_week_serviceId_key" ON "availabilities"("businessId", "day_of_week", "serviceId") WHERE "serviceId" IS NOT NULL;
