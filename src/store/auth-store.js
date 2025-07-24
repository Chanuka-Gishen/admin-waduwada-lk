import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define auth and snackbar state with Zustand and add persistence
const useAuthStore = create(
  persist(
    (set) => ({
      // Auth State
      auth: {
        isLoggedIn: false,
        user: {
          id: '',
          token: null,
          name: '',
          userEmail: '',
          userRole: '',
          isUserFirstLogin: true,
        },
      },
      loginUser: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: true,
            user: {
              id: payload.user._id,
              token: payload.token,
              name: payload.user.adminFullName,
              userEmail: payload.user.adminEmail,
              userRole: payload.user.adminRole,
              isUserFirstLogin: payload.user.isAdminFirstLogin,
            },
          },
        })),
      saveUserData: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: payload._id,
              token: null,
              name: '',
              userEmail: '',
              userRole: '',
              isUserFirstLogin: true,
            },
          },
        })),
      logoutUser: () =>
        set(() => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: '',
              token: null,
              name: '',
              userEmail: '',
              userRole: '',
              isUserFirstLogin: true,
            },
          },
        })),
    }),
    {
      name: 'auth-storage', // storage name for localStorage
    }
  )
);

export default useAuthStore;
