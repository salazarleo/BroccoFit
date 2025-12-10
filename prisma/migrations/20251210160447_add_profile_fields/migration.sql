-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "heightCm" INTEGER,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "weightKg" DOUBLE PRECISION;
