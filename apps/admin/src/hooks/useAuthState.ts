import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { fetchUserProfile } from 'common/src/api/users';
import useUserStore from '../store/useUserStore';
import { supabase } from 'common/src/supabase';

const useAuthState = () => {
  const { setUserProfile } = useUserStore();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const userData = await fetchUserProfile(userId);
      setUserProfile(userData);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        console.log('No session found');
        setLoading(false);
        setSession(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        console.log('No session found');
        setLoading(false);
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUserProfile]);

  return { session, loading };
};

export default useAuthState;
