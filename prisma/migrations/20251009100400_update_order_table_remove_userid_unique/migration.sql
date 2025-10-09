-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- DropIndex (unique index)
DROP INDEX `orders_userId_key` ON `orders`;

-- AddForeignKey (tạo lại FK nhưng không cần unique)
ALTER TABLE `orders`
ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
