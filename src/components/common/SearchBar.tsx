import styles from "@/style/components/common/SearchBar.module.scss";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.searchIconWrapper}>
          <Image src="/icons/search/search.png" width={15} height={15} alt="search" />
        </div>
        <input type="text" className={styles.searchText} placeholder="Search.." />
        <div className={styles.combinedWrapper}>
          <Image src="/icons/search/combined.png" width={13} height={11} alt="search" />
        </div>
      </div>
    </div>
  );
}
