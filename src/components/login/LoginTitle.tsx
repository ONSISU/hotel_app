import styles from "@/style/components/login/LoginTitle.module.scss";

type props = {
  mainTitle: string;
  subTitle: string;
  emphasizeTitle?: string;
};

export default function LoginTitle({mainTitle, subTitle, emphasizeTitle}: props) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{mainTitle}</h1>
        <p className={styles.subtitle}>{subTitle}</p>

        {emphasizeTitle && <p className={styles.emphasizeTitle}>{emphasizeTitle}</p>}
      </div>
    </>
  );
}
