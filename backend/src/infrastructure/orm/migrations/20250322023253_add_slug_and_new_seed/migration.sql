/*
  Warnings:

  - A unique constraint covering the columns `[businessId,day_of_week,serviceId]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `start_time` on the `availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `slug` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `en_name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availabilities" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "en_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "availabilities_start_time_end_time_idx" ON "availabilities"("start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "availabilities_businessId_day_of_week_serviceId_key" ON "availabilities"("businessId", "day_of_week", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_slug_key" ON "businesses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_slug_key" ON "user_profiles"("slug");
