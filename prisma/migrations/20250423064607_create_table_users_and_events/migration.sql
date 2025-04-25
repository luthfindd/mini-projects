-- CreateTable
CREATE TABLE "User" (
    "User_id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Refferal_code" TEXT NOT NULL,
    "Created_at" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_id")
);

-- CreateTable
CREATE TABLE "Events" (
    "Events_id" INTEGER NOT NULL,
    "Organizer_Id" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Date_Time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Capacity" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("Events_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
