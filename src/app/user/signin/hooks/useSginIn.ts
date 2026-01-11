import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetUser } from "../store/useSigninStore";
type loginInfoType = {
  email: string;
  password: string;
};

export default function useSignin() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState<loginInfoType>({email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetUser();

  const goLogin = async () => {
    setIsLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...loginInfo}),
    });

    const json = await res.json();
    if (json.statusCode == 200) {
      const userData = {
        userId : json.data.userId,
        email : json.data.email, // API 응답에서 사용자 이메일
        fullName : json.data.fullName, // API 응답에서 사용자 이름
        phone : json.data.phone,
        accessToken : json.data.accessToken,
        refreshToken :json.data.refreshToken
      };
      console.log(userData);
      localStorage.setItem("accessToken" ,json.data.accessToken);
      setUser(userData); // Zustand 스토어에 사용자 정보 저장
      router.push("/");
    } else {
      alert("로그인에 실패하였습니다.");
    }

    setIsLoading(false);
  };
  
  return {
    router,
    loginInfo, setLoginInfo,
    isLoading, setIsLoading,
    goLogin,
  }
}