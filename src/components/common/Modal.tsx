import styles from "@/style/components/common/Modal.module.scss";

type props = {
  color?: string;
  isSuccess?: boolean;
  buttonName?: string;
  explaination?: string;
};

export default function Modal({
  color = "#66CB63",
  isSuccess = true,
  buttonName = "Continue",
  explaination = "Your password is succesfully created",
}: props) {
  return (
    <>
      <div className={styles.outerContainer}></div>

      <div className={styles.innerContainer}>
        <div className={styles.modalIcon}>
          <img src="/icons/whiteCheck.png" alt="" />
        </div>

        <h2>{isSuccess ? "Success" : "Fail"}</h2>

        <p className={styles.explaination}>{explaination}</p>

        <button className={styles.modalButton}>{buttonName}</button>
      </div>
    </>
  );
}
