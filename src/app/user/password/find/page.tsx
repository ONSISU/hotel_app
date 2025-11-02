import styles from "@/style/page/login/Login.module.scss";
import Image from "next/image";
import LoginTitle from "@/components/login/LoginTitle";
import LoginButton from "@/components/login/LoginButton";

export default function NewPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image src="/icons/arrowLeft.png" width={17} height={14} alt="test" />
      </div>

      <LoginTitle mainTitle="Forgot Password" subTitle="Recover your account password" />

      <section className={`${styles.loginSection}`} style={{marginBottom: "40px"}}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="fullName"
          className={styles.inputBox}
          placeholder="Enter your Name"
        />
      </section>

      <LoginButton buttonName="Next" />
    </div>
  );
}
