-- Remove the restrictive email constraint that's causing issues
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_email_check;

-- Add a simpler, more reliable email constraint
ALTER TABLE public.leads ADD CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');