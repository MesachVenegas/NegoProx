-- AlterTable
ALTER TABLE "business_profiles" ADD COLUMN     "about" TEXT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "img_url" TEXT DEFAULT 'https://www.suac.ac.jp/archives/data/00091/file/19559/noimage.png';
