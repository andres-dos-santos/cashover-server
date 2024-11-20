/*
  Warnings:

  - A unique constraint covering the columns `[doc]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "companies_doc_key" ON "companies"("doc");
