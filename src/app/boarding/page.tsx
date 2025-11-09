"use client";

import {useEffect, useState} from "react";

import CommonButton from "@/components/common/CommonButton";
import styles from "@/style/page/boarding/Boarding.module.scss";
import {useRouter} from "next/navigation";

const boardingStyles = [styles.boarding1, styles.boarding2, styles.boarding3];
const BOARDING_CONFIG = [
  {
    style: styles.boarding1,
    title: (
      <>
        Luxury and Comfort,
        <br />
        Just a Tap Away
      </>
    ),
    description: (
      <>
        Semper in cursus magna et eu varius
        <br />
        nunc adipiscing. Elementum justo, laoreet
        <br />
        id sem .{" "}
      </>
    ),
  },
  {
    style: styles.boarding2,
    title: (
      <>
        Book with Ease, Stay <br />
        with Style
      </>
    ),
    description: (
      <>
        Semper in cursus magna et eu varius
        <br />
        nunc adipiscing. Elementum justo, laoreet
        <br />
        id sem .{" "}
      </>
    ),
  },
  {
    style: styles.boarding3,
    title: (
      <>
        Discover Your Dream <br />
        Hotel, Effortlessly
      </>
    ),
    description: (
      <>
        Lorem Ipsum is simply dummy text of the printing and
        <br />
        typesetting industry.{" "}
      </>
    ),
  },
];

export default function Boarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentPage = BOARDING_CONFIG[activeIndex];
  const router = useRouter();

  const goLogin = () => {
    router.push("/user/signin");
  };

  const beforeSetActiveIndex = () => {
    if (activeIndex >= 2) setActiveIndex(2);
    else setActiveIndex(activeIndex + 1);
  };

  return (
    <div className={styles.boardingContainer}>
      <div
        className={`${styles.container} ${styles.boarding1} ${
          activeIndex === 0 ? styles.active : activeIndex > 0 ? styles.prev : styles.next
        }`}
      >
        <p className={styles.boardingTitle}>{currentPage.title}</p>
        <p className={styles.boardingSubTitle}>{currentPage.description}</p>
        <div className={styles.statusCircles}>
          <span className={`${styles.circle} ${styles.active}`}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <CommonButton buttonName="Continue" clickedButton={beforeSetActiveIndex} />
      </div>
      <div
        className={`${styles.container} ${styles.boarding2} ${
          activeIndex === 1 ? styles.active : activeIndex > 1 ? styles.prev : styles.next
        }`}
      >
        <p className={styles.boardingTitle}>{currentPage.title}</p>
        <p className={styles.boardingSubTitle}>{currentPage.description}</p>
        <div className={styles.statusCircles}>
          <span className={styles.circle}></span>
          <span className={`${styles.circle} ${styles.active}`}></span>
          <span className={styles.circle}></span>
        </div>
        <CommonButton buttonName="Continue" clickedButton={beforeSetActiveIndex} />
      </div>
      <div
        className={`${styles.container} ${styles.boarding3} ${
          activeIndex === 2 ? styles.active : activeIndex > 2 ? styles.prev : styles.next
        }`}
      >
        <p className={styles.boardingTitle}>{currentPage.title}</p>
        <p className={styles.boardingSubTitle}>{currentPage.description}</p>
        <div className={styles.statusCircles}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={`${styles.circle} ${styles.active}`}></span>
        </div>
        <CommonButton buttonName="Get Started" clickedButton={goLogin} />
        <p className={styles.registerGuide}>
          Don&apos;t have an account ? <span className={styles.highlight}>Register</span>
        </p>
      </div>
    </div>
  );
}
