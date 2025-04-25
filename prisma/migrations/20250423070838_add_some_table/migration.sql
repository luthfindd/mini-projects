/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "refferal_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "events" (
    "events_Id" INTEGER NOT NULL,
    "organizer_Id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_Time" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("events_Id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "tickets_Id" SERIAL NOT NULL,
    "event_Id" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "discount_Used" INTEGER NOT NULL,
    "final_Price" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("tickets_Id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "trans_id" INTEGER NOT NULL,
    "tickets_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("trans_id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "ref_id" INTEGER NOT NULL,
    "referrer_id" INTEGER NOT NULL,
    "referee_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("ref_id")
);

-- CreateTable
CREATE TABLE "user_points" (
    "point_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "earned_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "user_points_pkey" PRIMARY KEY ("point_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "cat_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("cat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
