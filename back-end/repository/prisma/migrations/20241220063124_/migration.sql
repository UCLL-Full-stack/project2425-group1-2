-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "deadline" SET DEFAULT NOW() + interval '3 month';
