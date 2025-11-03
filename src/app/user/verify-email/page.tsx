"use client";

import styles from "@/style/page/login/Login.module.scss";
import verifyEmailStyles from "@/style/page/login/VerifyEmail.module.scss";
import Image from "next/image";
import LoginTitle from "@/components/login/LoginTitle";
import LoginButton from "@/components/login/LoginButton";
import Loading from "@/components/Loading";
import {useEffect, useState} from "react";
import {useUser} from "@/app/user/UserContext";
import {useRouter} from "next/navigation";

export default function NewPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [emailCode, setEmailCode] = useState<string[]>([]);

  const {user} = useUser();

  const beforeSetEmailCode = (idx: number, val: string) => {
    const 타켓이메일코드 = [...emailCode];
    타켓이메일코드[idx] = val;
    setEmailCode([...타켓이메일코드]);
  };

  const sendEmailCode = async () => {
    setIsLoading(true);
    const param = {
      email: user?.email || "gnsdl9079@gmail.com",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sendEmail`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(param),
    });
    const json = await res.json();
    setIsLoading(false);
  };

  useEffect(() => {
    sendEmailCode();
  }, []);

  const verifyEmail = async () => {
    const 코드 = emailCode.join("");

    setIsLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verifyEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: user?.email || "", verificationCode: 코드}),
    });
    const json = await res.json();
    setIsLoading(false);

    if (json?.statusCode == 200) {
      join();
    } else {
      alert("이메일 인증 실패");
    }
  };

  const join = async () => {
    setIsLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...user}),
    });

    const json = await res.json();

    if (json.statusCode == 200) {
      router.push("/user/signin");
    } else {
      alert("회원가입에 실패하였습니다.");
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <Image src="/icons/arrowLeft.png" width={17} height={14} alt="test" />
      </div>

      <LoginTitle
        mainTitle="Enter OTP"
        subTitle="We have just sent you 4 digit code via your email example@gmail.com"
      />

      <section className={verifyEmailStyles.otpNumbers}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
          onChange={(e) => beforeSetEmailCode(0, e.target.value)}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
          onChange={(e) => beforeSetEmailCode(1, e.target.value)}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
          onChange={(e) => beforeSetEmailCode(2, e.target.value)}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
          onChange={(e) => beforeSetEmailCode(3, e.target.value)}
        />
      </section>

      <LoginButton buttonName="Continue" clickedButton={verifyEmail} />

      <p className={styles.guide2} style={{paddingTop: "24px"}}>
        Didn’t receive code?&nbsp;
        <button style={{color: "#2853AF", fontWeight: 600, fontSize: "16px"}}> Resend Code</button>
      </p>

      {isLoading && <Loading />}
    </div>
  );
}
