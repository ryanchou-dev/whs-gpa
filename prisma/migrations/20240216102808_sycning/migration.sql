-- CreateTable
CREATE TABLE "Class" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "grade" STRING NOT NULL,
    "credits" STRING NOT NULL,
    "courseType" STRING NOT NULL,
    "year" STRING NOT NULL,
    "authorId" STRING NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
