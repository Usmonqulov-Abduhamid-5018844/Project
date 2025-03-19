-- CreateTable
CREATE TABLE "Sesion" (
    "id" SERIAL NOT NULL,
    "api" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sesion_pkey" PRIMARY KEY ("id")
);
