-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ride_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("customerId", "destination", "distance", "driverId", "id", "origin") SELECT "customerId", "destination", "distance", "driverId", "id", "origin" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
