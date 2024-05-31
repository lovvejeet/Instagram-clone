import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null, //initially we dont visiting any profile
  setUserProfile: (userProfile) => set({ userProfile }),
}));

export default useUserProfileStore;
