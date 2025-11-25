-- Create RLS policy to allow public inserts into leads table
CREATE POLICY "Enable insert access for all users" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);