import styles from "@/style/components/common/CommonButton.module.scss";

type props = {
  buttonName: string;
  clickedButton?: () => void;
};

export default function CommonButton({buttonName, clickedButton}: props) {
  return (
    <>
      <button className={styles.signInButton} onClick={clickedButton}>
        {buttonName}
      </button>
    </>
  );
}
