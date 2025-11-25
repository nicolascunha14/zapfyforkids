-- Fix the search_path warning by ensuring all functions have proper search_path
-- Update existing functions to have explicit search_path settings

-- Update the can_insert_lead function to be more explicit
CREATE OR REPLACE FUNCTION public.can_insert_lead(
  email_param text,
  source_param text DEFAULT 'external'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_count integer;
  email_count integer;
BEGIN
  -- Basic input validation
  IF email_param IS NULL OR email_param = '' THEN
    RETURN false;
  END IF;
  
  -- Check email format (basic validation)
  IF email_param !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN false;
  END IF;
  
  -- Rate limiting: max 3 submissions per email per hour
  SELECT COUNT(*) INTO email_count
  FROM public.leads
  WHERE lower(email) = lower(email_param)
    AND created_at > NOW() - INTERVAL '1 hour';
    
  IF email_count >= 3 THEN
    RETURN false;
  END IF;
  
  -- Rate limiting: max 50 total submissions per hour from any source
  SELECT COUNT(*) INTO recent_count
  FROM public.leads
  WHERE created_at > NOW() - INTERVAL '1 hour';
    
  IF recent_count >= 50 THEN
    RETURN false;
  END IF;
  
  -- Validate source parameter
  IF source_param NOT IN ('landing_page', 'contact_expert', 'waitlist', 'external') THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Update the cleanup function as well
CREATE OR REPLACE FUNCTION public.cleanup_old_leads()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Delete leads older than 90 days to prevent table bloat
  DELETE FROM public.leads 
  WHERE created_at < NOW() - INTERVAL '90 days';
  
  RETURN NULL;
END;
$$;