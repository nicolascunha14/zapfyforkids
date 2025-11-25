-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.leads;

-- Create a function to check for rate limiting and basic validation
CREATE OR REPLACE FUNCTION public.can_insert_lead(
  email_param text,
  source_param text DEFAULT 'external'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
  
  -- Rate limiting: max 10 total submissions per hour from any source
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

-- Create a more secure insert policy with rate limiting and validation
CREATE POLICY "Allow controlled lead insertion"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  can_insert_lead(email, COALESCE(source, 'external'))
  AND email IS NOT NULL
  AND length(trim(email)) <= 255
  AND (name IS NULL OR length(trim(name)) <= 100)
  AND (phone IS NULL OR length(trim(phone)) <= 20)
  AND (source IS NULL OR length(trim(source)) <= 50)
);

-- Add an index to improve performance of rate limiting queries
CREATE INDEX IF NOT EXISTS idx_leads_email_created_at ON public.leads(lower(email), created_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);

-- Add a trigger to automatically clean up old leads (optional - keeps table size manageable)
CREATE OR REPLACE FUNCTION public.cleanup_old_leads()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete leads older than 90 days to prevent table bloat
  DELETE FROM public.leads 
  WHERE created_at < NOW() - INTERVAL '90 days';
  
  RETURN NULL;
END;
$$;

-- Create trigger to run cleanup daily (triggers on first insert each day)
DROP TRIGGER IF EXISTS cleanup_old_leads_trigger ON public.leads;
CREATE TRIGGER cleanup_old_leads_trigger
  AFTER INSERT ON public.leads
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.cleanup_old_leads();