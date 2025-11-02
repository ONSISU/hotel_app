import styles from "@/style/components/login/LoginButton.module.scss";

type props = {
  buttonName: string;
};

export default function LoginButton({buttonName}: props) {
  return (
    <>
      <button className={styles.signInButton}>{buttonName}</button>
    </>
  );
}
