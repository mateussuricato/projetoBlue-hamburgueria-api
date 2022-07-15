/*
  Warnings:

  - You are about to drop the column `created_at` on the `favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "created_at",
ADD COLUMN     "favirited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
