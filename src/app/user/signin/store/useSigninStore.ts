import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  userId: '',
  email: '',
  fullName: '',
  phone: '',
  accessToken: '',
  refreshToken: '',
}

type User = {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
}

const useSigninStore = create(
  devtools(
    combine(
      initialState,
      (set) => ({
        actions: {
          setUser: (param:User) => {
            set({...param})
          },
          clearUser: () => {
            set({...initialState})
          }
        }
      })
    ),
        // ✅ 저장할 대상 선택하여 설정
    {
      name: 'userStore'
    }
  )
)

export const useGetUserId = () => useSigninStore(s => s.userId);
export const useSetUser = () => useSigninStore(s => s.actions.setUser);
export const useClearUser = () => useSigninStore(s => s.actions.clearUser);