/* eslint-disable */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'common/src/types';
import { Session } from '@supabase/supabase-js';

type UserProfile = {
  userProfile: null | User;
  setUserProfile: (userProfile: User) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  loadingProfile: boolean;
  setLoadingProfile: (loadingProfile: boolean) => void;
  clearUserProfile: () => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

const useUserStore = create<UserProfile>(
  // @ts-ignore
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (userProfile: User) => set({ userProfile }),
      clearUserProfile: () => set({ userProfile: null }),
      darkMode: false,
      setDarkMode: (darkMode: boolean) => set({ darkMode }),
      session: null,
      setSession: (session: Session | null) => set({ session }),
      loadingProfile: false,
      setLoadingProfile: (loadingProfile: boolean) => set({ loadingProfile }),
    }),
    {
      name: 'userProfileStore',
    }
  )
);

export default useUserStore;
