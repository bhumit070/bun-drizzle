ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");