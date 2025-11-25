-- Relax leads table constraints to allow waitlist-only email inserts
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_name_check;
ALTER TABLE public.leads ALTER COLUMN name DROP NOT NULL;
ALTER TABLE public.leads ALTER COLUMN phone DROP NOT NULL;