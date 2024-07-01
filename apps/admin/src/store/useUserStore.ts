/* eslint-disable */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'common/src/types';

type UserProfile = {
  userProfile: null | User;
  setUserProfile: (userProfile: User) => void;
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
    }),
    {
      name: 'userProfileStore',
    }
  )
);

export default useUserStore;
