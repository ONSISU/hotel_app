import styles from "@/style/page/login/Login.module.scss";
import Image from "next/image";
import LoginButton from "@/components/login/LoginButton";
import LoginTitle from "@/components/login/LoginTitle";
import Link from "next/link";

export default function NewPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image src="/icons/arrowLeft.png" width={17} height={14} alt="test" />
      </div>

      <LoginTitle mainTitle="Create Account" subTitle="Make create account and Enjoy" />

      <section className={styles.loginSection}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          className={styles.inputBox}
          placeholder="Enter your email address"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={styles.inputBox}
          placeholder="Enter your password"
        />
      </section>

      <section className={styles.loginSubOptions}>
        <div className={styles.remembermeWrapper}>
          <input type="checkbox" name="rememberme" />
          <span className={styles.rememberme}></span>Remember Me
        </div>

        <div>
          <button className={styles.forgetPassword}>Forgot Password</button>
        </div>
      </section>

      <LoginButton buttonName="Sign In" />

      <section className={styles.moreOptions}>
        <div className={styles.joinOption}>
          <span className={styles.joinGuide}>Don&apos;t have an account?</span>
          <button className={styles.joinButton}>
            <Link href="/user/signup">Sign Up</Link>
          </button>
        </div>

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
