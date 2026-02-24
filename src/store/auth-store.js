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
              id: payload.user.id,
              token: payload.token,
              name: payload.user.full_name,
              userEmail: payload.user.email,
              userRole: payload.user.role,
              isUserFirstLogin: payload.user.is_first_login,
            },
          },
        })),
      saveUserData: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: payload.id,
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
