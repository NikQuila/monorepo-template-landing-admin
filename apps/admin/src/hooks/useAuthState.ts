import { useEffect } from 'react';
import { fetchUserProfile } from 'common/src/api/users';
import useUserStore from '../store/useUserStore';
import { supabase } from 'common/src/supabase';

const useAuthState = () => {
  const {
    setUserProfile,
    loadingProfile,
    setLoadingProfile,
    setSession,
    session,
  } = useUserStore();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const userData = await fetchUserProfile(userId);
      setUserProfile(userData);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        fetchProfile(session.user.id).finally(() => setLoadingProfile(false));
      } else {
        console.log('No session found');
        setLoadingProfile(false);
        setSession(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        fetchProfile(session.user.id).finally(() => setLoadingProfile(false));
      } else {
        console.log('No session found');
        setLoadingProfile(false);
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUserProfile]);

  return { session, loadingProfile };
};

export default useAuthState;
