# Abena Hair Studio

A responsive ladies salon website built with Next.js, React, Tailwind CSS, TypeScript, and Supabase-ready API routes.

## Setup

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your Supabase project URL and service role key
4. Add SMTP credentials to send booking/contact emails (optional but recommended)
5. Run `npm run dev`

## SMTP Email Notifications

When SMTP variables are configured, the app sends:

- Customer confirmation emails for contact submissions
- Customer confirmation emails for booking submissions
- Optional admin notifications for each new contact/booking (if `ADMIN_NOTIFICATION_EMAIL` is set)

Required SMTP variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true` for SSL/TLS, usually `false` for STARTTLS on port 587)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## Suggested Supabase Tables

### `bookings`

- `id` uuid primary key default `gen_random_uuid()`
- `created_at` timestamptz default `now()`
- `full_name` text
- `email` text
- `phone` text
- `service` text
- `preferred_date` date
- `notes` text nullable

### `messages`

- `id` uuid primary key default `gen_random_uuid()`
- `created_at` timestamptz default `now()`
- `name` text
- `email` text
- `message` text
