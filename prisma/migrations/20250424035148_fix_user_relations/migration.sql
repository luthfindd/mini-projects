/*
  Warnings:

  - You are about to drop the `user_points` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_points";

-- CreateTable
CREATE TABLE "users_points" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "earned_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "users_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_coupons" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "discount_percentage" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_coupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_points" ADD CONSTRAINT "users_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
