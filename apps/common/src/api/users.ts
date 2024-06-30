import { supabase } from '../supabase';

export const fetchUserProfile = async (userId: string) => {
  try {
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('auth_id', userId)
      .single();
    if (userError) throw userError;
    return userData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user profile');
  }
};
