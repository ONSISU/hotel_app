import { create } from 'zustand';

const HotelStates = create(
  persist(
    (set) => ({ // get은 현재 setUser에서 사용하지 않으므로 제거했습니다. 필요하면 다시 추가하세요.
      // ⭐️ 상태 (State) - 이 부분은 동일합니다.
      userId: null,
      email: null,
      fullName: null,
      phone: null,
      accessToken: null,
      refreshToken: null, 

      // ⭐️ 액션 (Actions) - 이 부분은 동일합니다.
      setUser: (userData) => {
        // userData가 null 또는 undefined인 경우를 처리하여, 모든 상태를 null로 초기화
        if (!userData) {
          console.warn("setUser: userData가 null 또는 undefined입니다. 스토어 상태를 초기화합니다.");
          set({
            userId: null,
            email: null,
            fullName: null,
            phone: null,
            accessToken: null,
            refreshToken: null,
          });
          return;
        }

        set({
          userId: userData.userId || "",         // userData에 userId가 없다면 빈 문자열
          email: userData.email || "",           // userData에 email이 없다면 빈 문자열
          fullName: userData.fullName || "",     // userData에 fullName이 없다면 빈 문자열
          phone: userData.phone || "",           // userData에 phone이 없다면 빈 문자열
          accessToken: userData.accessToken || "", // userData에 accessToken이 없다면 빈 문자열
          refreshToken: userData.refreshToken || "", // userData에 refreshToken이 없다면 빈 문자열
        });
        console.log("Zustand persist: 사용자 정보가 설정되었고 localStorage에 저장될 예정입니다.");
      },

      // 추가로 인증 정보를 비우는 clearAuth 액션을 고려해볼 수 있습니다.
    }),
  )
);

export default HotelStates;