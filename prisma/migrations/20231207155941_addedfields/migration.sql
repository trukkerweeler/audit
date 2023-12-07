/*
  Warnings:

  - You are about to drop the `GroceryList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GroceryList";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "qmsref" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "rev" TEXT
);
INSERT INTO "new_Audit" ("id", "qmsref", "title") SELECT "id", "qmsref", "title" FROM "Audit";
DROP TABLE "Audit";
ALTER TABLE "new_Audit" RENAME TO "Audit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
