-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT true;
