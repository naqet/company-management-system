/*
  Warnings:

  - You are about to drop the column `assignedUsersIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "deadline" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "assignedUsersIds";
