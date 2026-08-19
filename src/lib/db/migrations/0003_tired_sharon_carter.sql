ALTER TABLE "library_items" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
UPDATE "library_items" SET "category" = 'documents' WHERE "category" = 'books';--> statement-breakpoint
DROP TYPE "public"."library_category";--> statement-breakpoint
CREATE TYPE "public"."library_category" AS ENUM('documents', 'images');--> statement-breakpoint
ALTER TABLE "library_items" ALTER COLUMN "category" SET DATA TYPE "public"."library_category" USING "category"::"public"."library_category";