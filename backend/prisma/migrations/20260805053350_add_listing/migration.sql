-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'GOOD', 'FAIR', 'WORN');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('FREE', 'DISCOUNTED');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('AVAILABLE', 'REQUESTED', 'GIVEN_AWAY', 'FLAGGED');

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "priceType" "PriceType" NOT NULL,
    "listedPrice" DECIMAL(10,2),
    "note" TEXT,
    "status" "ListingStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
