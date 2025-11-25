-- Remove the public read policy that allows anyone to access leads data
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leads;

-- Create a new policy that only allows admin users to read leads data
CREATE POLICY "Admin can view all leads" 
ON public.leads 
FOR SELECT 
USING (is_admin_user());

-- Keep the public insert policy for lead generation forms (waitlist, contact forms)
-- This allows anonymous users to submit their information but not read others' data