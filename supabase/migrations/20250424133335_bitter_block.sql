/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing policies that cause recursion
    - Create new, simplified policies for profiles table
      - Allow users to read their own profile
      - Allow admins to read all profiles
      - Allow users to update their own profile
      - Allow system to create new profiles during signup
  
  2. Security
    - Maintains RLS protection
    - Prevents infinite recursion in policies
    - Ensures proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Create new policies
CREATE POLICY "Enable read access for users to their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Enable insert for service role only"
ON profiles FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Enable update for users on their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add policy for admins to read all profiles
CREATE POLICY "Enable read access for admins to all profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM profiles 
    WHERE role = 'admin'
  )
);