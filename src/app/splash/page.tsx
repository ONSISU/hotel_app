import styles from "@/style/page/splash/Splash.module.scss";

export default function Splash() {
  return (
    <div className={styles.container}>
      <ul className={styles.landingWrapper}>
        <li className={styles.logo}>
          <div className={styles.logoWrapper}>
            <img src="/images/splash/LandingLogo.png" alt="" />
          </div>
        </li>
        <li className={styles.hotelName}>
          <p>Grand Hotel</p>
        </li>
        <li className={styles.hotelSub}>
          <p>Find Your Perfect Stay, Anytime, Anywhere</p>
        </li>
      </ul>
    </div>
  );
}
