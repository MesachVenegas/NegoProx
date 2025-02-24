-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "idDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;
