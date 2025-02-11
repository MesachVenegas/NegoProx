/*
  Warnings:

  - You are about to alter the column `amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "appointments_datetime_idx" ON "appointments"("datetime");

-- CreateIndex
CREATE INDEX "appointments_state_idx" ON "appointments"("state");

-- CreateIndex
CREATE INDEX "availabilities_start_time_end_time_idx" ON "availabilities"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "availabilities_day_of_week_idx" ON "availabilities"("day_of_week");

-- CreateIndex
CREATE INDEX "availabilities_serviceId_idx" ON "availabilities"("serviceId");

-- CreateIndex
CREATE INDEX "business_categories_categoryId_idx" ON "business_categories"("categoryId");

-- CreateIndex
CREATE INDEX "business_images_order_businessId_idx" ON "business_images"("order", "businessId");

-- CreateIndex
CREATE INDEX "businesses_created_at_idx" ON "businesses"("created_at");

-- CreateIndex
CREATE INDEX "businesses_address_idx" ON "businesses"("address");

-- CreateIndex
CREATE INDEX "businesses_name_idx" ON "businesses"("name");

-- CreateIndex
CREATE INDEX "conversations_lastMessageId_idx" ON "conversations"("lastMessageId");

-- CreateIndex
CREATE INDEX "conversations_clientId_businessUserId_idx" ON "conversations"("clientId", "businessUserId");

-- CreateIndex
CREATE INDEX "messages_status_read_at_idx" ON "messages"("status", "read_at");

-- CreateIndex
CREATE INDEX "messages_timestamp_idx" ON "messages"("timestamp");

-- CreateIndex
CREATE INDEX "payments_timestamp_idx" ON "payments"("timestamp");

-- CreateIndex
CREATE INDEX "payments_status_payment_method_idx" ON "payments"("status", "payment_method");

-- CreateIndex
CREATE INDEX "reviews_rate_idx" ON "reviews"("rate");

-- CreateIndex
CREATE INDEX "reviews_reviewed_at_idx" ON "reviews"("reviewed_at");

-- CreateIndex
CREATE INDEX "services_price_idx" ON "services"("price");

-- CreateIndex
CREATE INDEX "services_time_idx" ON "services"("time");

-- CreateIndex
CREATE INDEX "user_profiles_userId_idx" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_user_type_idx" ON "users"("user_type");

-- CreateIndex
CREATE INDEX "works_init_date_end_date_idx" ON "works"("init_date", "end_date");

-- CreateIndex
CREATE INDEX "works_clientId_status_idx" ON "works"("clientId", "status");
