"use client";

import styles from "@/style/page/login/Login.module.scss";
import verifyEmailStyles from "@/style/page/login/VerifyEmail.module.scss";
import Image from "next/image";
import LoginTitle from "@/components/login/LoginTitle";
import LoginButton from "@/components/login/LoginButton";
import Loading from "@/components/Loading";
import {useState} from "react";

export default function NewPage() {
  const [isLoading, setIsLoading] = useState(false);
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
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={verifyEmailStyles.otpInput}
        />
      </section>

      <LoginButton buttonName="Continue" />

      <p className={styles.guide2} style={{paddingTop: "24px"}}>
        Didn’t receive code?&nbsp;
        <button style={{color: "#2853AF", fontWeight: 600, fontSize: "16px"}}> Resend Code</button>
      </p>

      {isLoading && <Loading />}
    </div>
  );
}
