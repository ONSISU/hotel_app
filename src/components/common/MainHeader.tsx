import styles from "@/style/components/common/MainHeader.module.scss";
import Image from "next/image";
import {useMemo} from "react";

type propsHeader = {
  backType?: number;
  title?: string;
  subIconType?: number;
};

// backType = (1: 뒤로가기(흰원바탕) | 2: 뒤로가기(옅은흰바탕))
// subIconType = (1: 더보기버튼(점세개) | 2: 가로세줄 | 3: 알림)

const subIconImage = [
  "/icons/header/more.png",
  "/icons/header/sort.png",
  "/icons/header/notification.png",
];

export default function MainHeader({backType = 1, title, subIconType}: propsHeader) {
  const subIconImagePath = useMemo(() => {
    if (!subIconType) return;
    return subIconImage[(subIconType >= 3 ? 1 : subIconType) - 1];
  }, [subIconType]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          {backType && (
            <div
              className={`${styles.backButton} ${backType === 2 && styles.backButtonTransparent}`}
            >
              <Image src="/icons/header/arrowLeft.png" width={17} height={14} alt="back" />
            </div>
          )}

          {/* 제목영역 */}
          {title && <div className={styles.title}>{title}</div>}

          {subIconType && (
            <div className={styles.subIcon}>
              <Image src={subIconImagePath} width={24} height={24} alt="back" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
