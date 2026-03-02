'use client'
import { useClearUser, useGetUserId, useSetUser } from "@/views/user/signin/store/useSigninStore";
import { ReactNode, useEffect } from "react";
import { BaseResponse, UserInfo } from "../../types/user/userType";
// import { toast } from "sonner";

export default function AuthProvider({children}:{children: ReactNode}) {

  const setUser = useSetUser();
  const claerUser = useClearUser();
  const userId = useGetUserId();

  useEffect(() => {
    if (userId) return;

    const fetchUserMe = async ():Promise<BaseResponse<UserInfo>> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken') || ''
        },
        method: 'POST', 
        credentials: 'include'
      });
      if (!res.ok) {
        const json: BaseResponse<UserInfo> = await res.json();

        //toast('토큰 만료로 인해 재로그인 필요. zustand 제거함(테스트 토스트)')

        claerUser();
        
        // toast.error('(테스트 확인용)사용자 정보 갱신 실패: ' + json.message, {position: 'top-center'})
      }

      const data = await res.json();
      
      return data;
    }

    fetchUserMe().then(res => {
      setUser(res.data);
      // toast('쿠키 토큰으로 사용자 정보 갱신 성공(테스트 확인용) 쿠키 제거하면 로그아웃됨');

    });

  }, []);

  return (
    <>
      {children}    
    </>
  )
}