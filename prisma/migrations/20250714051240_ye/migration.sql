/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `Biodata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `biodata` ADD COLUMN `id_user` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Biodata_id_user_key` ON `Biodata`(`id_user`);

-- AddForeignKey
ALTER TABLE `Biodata` ADD CONSTRAINT `Biodata_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
