import styles from "@/style/page/login/Login.module.scss";
import Image from "next/image";
import LoginTitle from "@/components/login/LoginTitle";
import LoginButton from "@/components/login/LoginButton";
import Modal from "@/components/common/Modal";

export default function NewPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image src="/icons/arrowLeft.png" width={17} height={14} alt="test" />
      </div>

      <LoginTitle mainTitle="Create a New Password" subTitle="Enter your new password" />

      <section className={`${styles.loginSection}`} style={{marginBottom: "40px"}}>
        <label htmlFor="newpassword">New Password</label>
        <input
          type="text"
          name="newpassword"
          className={styles.inputBox}
          placeholder="Enter new password"
        />
        <label htmlFor="email">Confirm Password</label>
        <input
          type="text"
          name="fullName"
          className={styles.inputBox}
          placeholder="Confirm your password"
        />
      </section>

      <LoginButton buttonName="Next" />
      <Modal />
    </div>
  );
}
