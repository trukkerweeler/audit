-- CreateTable
CREATE TABLE "Audit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "qmsref" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditid" INTEGER NOT NULL,
    "sql" INTEGER NOT NULL,
    "cltext" TEXT NOT NULL,
    "process" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Results" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditid" INTEGER NOT NULL,
    "clid" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "passfail" TEXT NOT NULL,
    "corrid" INTEGER NOT NULL,
    "flup" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "seller" TEXT DEFAULT '',
    "admin" TEXT DEFAULT '',
    "story" TEXT DEFAULT '',
    "password" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 0
);
