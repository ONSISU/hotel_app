"use client";

import styles from "@/style/page/login/Login.module.scss";
import Image from "next/image";
import LoginTitle from "@/components/login/LoginTitle";
import LoginButton from "@/components/login/LoginButton";
import {useUser} from "@/app/user/UserContext";
import Link from "next/link";

export default function SignUp() {
  const {user, setUser} = useUser();

  return (
    <div className={styles.container}>
      <div>
        <Image src="/icons/arrowLeft.png" width={17} height={14} alt="test" />
      </div>

      <LoginTitle mainTitle="Let's Sign you In" subTitle="We provide variety Comfort" />

      <section className={styles.loginSection} style={{marginBottom: "32px"}}>
        <label htmlFor="email">Full Name</label>
        <input
          type="text"
          name="fullName"
          className={styles.inputBox}
          placeholder="Enter your Name"
          onChange={(e) => setUser({fullName: e.target.value})}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          className={styles.inputBox}
          placeholder="Enter your email address"
          onChange={(e) => setUser({email: e.target.value})}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={styles.inputBox}
          placeholder="Enter your password"
          onChange={(e) => setUser({password: e.target.value})}
        />
      </section>

      {/* 👉 회원가입버튼 */}
      <Link href="/user/verify-email">
        <div className={styles.buttonWrapper}>
          <LoginButton buttonName="Create An Account" />
        </div>
      </Link>

      <section className={styles.moreOptions}>
        <div className={styles.moreOptionsDivider}>
          <span className={styles.divider}>Or Sign in with</span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.google}>
            <img src="/icons/googleSns.png" alt="" />
          </button>
          <button className={styles.Kakao}>
            <img src="/icons/appleSns.png" alt="" />
          </button>
          <button className={styles.Naver}>
            <img src="/icons/facebookSns.png" alt="" />
          </button>
        </div>
      </section>

      <p className={styles.guide2}>
        By signing up you agree to our <a href="">Terms</a>
      </p>
      <p className={styles.guide1}>
        and <a href="">Conditions of Use</a>
      </p>
    </div>
  );
}
