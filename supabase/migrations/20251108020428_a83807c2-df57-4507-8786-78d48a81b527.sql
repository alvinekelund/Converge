-- Create profiles table for candidates
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  profile TEXT,
  experience TEXT,
  education TEXT,
  skills TEXT,
  extracurriculars TEXT,
  preferences TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create postings table for recruiters
CREATE TABLE public.postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  about TEXT,
  description TEXT,
  responsibilities TEXT,
  qualifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.postings ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view all profiles
CREATE POLICY "Anyone can view profiles"
ON public.profiles
FOR SELECT
USING (true);

-- Profiles: Anyone can insert their own profile
CREATE POLICY "Anyone can insert profiles"
ON public.profiles
FOR INSERT
WITH CHECK (true);

-- Profiles: Anyone can update any profile
CREATE POLICY "Anyone can update profiles"
ON public.profiles
FOR UPDATE
USING (true);

-- Profiles: Anyone can delete any profile
CREATE POLICY "Anyone can delete profiles"
ON public.profiles
FOR DELETE
USING (true);

-- Postings: Anyone can view all postings
CREATE POLICY "Anyone can view postings"
ON public.postings
FOR SELECT
USING (true);

-- Postings: Anyone can insert postings
CREATE POLICY "Anyone can insert postings"
ON public.postings
FOR INSERT
WITH CHECK (true);

-- Postings: Anyone can update postings
CREATE POLICY "Anyone can update postings"
ON public.postings
FOR UPDATE
USING (true);

-- Postings: Anyone can delete postings
CREATE POLICY "Anyone can delete postings"
ON public.postings
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_postings_updated_at
BEFORE UPDATE ON public.postings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();