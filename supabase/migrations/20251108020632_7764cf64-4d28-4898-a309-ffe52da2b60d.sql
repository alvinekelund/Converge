-- Add preferred column to postings table
ALTER TABLE public.postings
ADD COLUMN preferred TEXT;