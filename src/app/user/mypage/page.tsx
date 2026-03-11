'use client';
import styles from "@/style/page/mypage/Mypage.module.scss";
import Image from "next/image";
import {useGetUserId} from "@/views/user/signin/store/useSigninStore";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyPage() {
  const router = useRouter();
	const userId = useGetUserId();

  const backPage=  () =>  {
    router.back(); 
  }
  return (
    <div className={styles.myPageWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
        <div className={styles.title01}>내정보</div>
      </div>
      <div className={styles.mypageContainer}>
        <div className={styles.profile}>
          <Image src="/images/profileImg.png" alt='프로필사진' width={48} height={48} className={styles.radiusProfileImg} />
          <div className={styles.profileInfo}>
            <div className={styles.name}>{userId}</div>
          </div>
          <Image src="/icons/notify-arrow.svg" alt='버튼' width={24} height={24} className={styles.notifyArrow} priority={true}/>
        </div>
        <div className={styles.info01}>
          <div className={styles.myReview}>내 리뷰</div>
          <div className={styles.line}>|</div>
          <div className={styles.myCoupon}>
            <div>쿠폰</div>
            <div>0</div>
          </div>
        </div>
        <div className={styles.reverseContent}>
          <Link href={`/hotel/ReserveHistory`}>
            <div className={styles.reverseHistory}>예약내역</div>
          </Link>
          {/* 임의로 칸 맞추기 */}
          <div className={styles.reverseHistory}>.</div>
          <div className={styles.reverseHistory}>.</div>
          <div className={styles.reverseHistory}>.</div>
        </div>
        <div className={styles.noticeContent}>
          <div className={styles.notice}>공지사항</div>
          <div className={styles.notice}>자주 묻는 질문</div>
          <div className={styles.notice}>문의</div>
          <div className={styles.notice}>이벤트</div>
        </div>
        <div className={styles.setupContent}>
          <div className={styles.setup}>이용약관</div>
          <div className={styles.setup}>개인정보 처리방침</div>
          <div className={styles.setup}>설정</div>
          <div className={styles.version}>
            <div className={styles.setup}>버전정보</div>
            <div className={styles.setup}>v1.0</div>
          </div>
        </div>
      </div>

    </div>
  );
}
