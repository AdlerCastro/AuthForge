/*
  Warnings:

  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "roleId" TEXT NOT NULL;
