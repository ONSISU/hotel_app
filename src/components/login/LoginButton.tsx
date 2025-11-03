import styles from "@/style/components/login/LoginButton.module.scss";

type props = {
  buttonName: string;
  clickedButton?: () => void;
};

export default function LoginButton({buttonName, clickedButton}: props) {
  return (
    <>
      <button className={styles.signInButton} onClick={clickedButton}>
        {buttonName}
      </button>
    </>
  );
}
