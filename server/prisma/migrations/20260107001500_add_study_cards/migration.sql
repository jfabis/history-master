-- CreateTable
CREATE TABLE "StudyCard" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "frontContent" TEXT NOT NULL,
    "backContent" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'FACT',

    CONSTRAINT "StudyCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudyCard" ADD CONSTRAINT "StudyCard_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
