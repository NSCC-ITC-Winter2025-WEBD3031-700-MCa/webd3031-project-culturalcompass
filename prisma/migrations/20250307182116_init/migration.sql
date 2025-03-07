-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT,
    "google_id" TEXT,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "stripe_customer_id" TEXT,
    "subscription_status" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_username_key" ON "UserModel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_google_id_key" ON "UserModel"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_stripe_customer_id_key" ON "UserModel"("stripe_customer_id");
