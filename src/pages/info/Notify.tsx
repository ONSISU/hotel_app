import styles from "@/style/page/info/Notify.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback  } from "react";

export default function Notify() {
  const router = useRouter();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [buttonToggledStates, setButtonToggledStates] = useState<boolean[]>(
    Array.from({ length: 4 }, () => false) 
  );
  const setItemRef = useCallback((node: HTMLDivElement | null, index: number) => {
    if (node) {
      itemRefs.current[index] = node; 
    }
  }, []); 


  useEffect(() => {
    const heights: number[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        heights[index] = ref.clientHeight;
      }
    });
    setItemHeights(heights);
  }, []); 

  // 아이템 배열 생성
  const items = Array.from({ length: 4 }, (_, i) => `아이템 ${i + 1}`);
  
  const backPage=  () =>  {
    router.back(); 
  }
  const handleToggleClick = (index: number) => {
    setButtonToggledStates(prevStates => {
      const newStates = [...prevStates]; // 이전 상태 배열을 복사
      newStates[index] = !newStates[index]; // 클릭된 버튼의 상태만 토글
      return newStates; // 새 상태 배열 반환
    });
  };
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.notifyContainer}>
          <div className={styles.titleContainer}>
            <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
            <div className={styles.title01}>알림</div>
            <div></div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.info}>
              <Image src="/icons/info.svg" alt='알림' width={22} height={22}/>
              <div className={styles.infoContent}>알림은 30일간 보관됩니다. 그 뒤엔 순차적으로 자동 삭제됩니다.</div>
            </div>
            <div className={styles.contentList}>
              {items.map((item, index) => (
              <div className={styles.contentBubble} key={item}
                ref={(node) => setItemRef(node, index)} >
                <div className={styles.notifyContent}>
                  <div>
                    <div className={styles.user}>운영자</div>
                    <div className={styles.line}> ㅣ </div>
                    <div className={styles.date}>25.11.25</div>
                  </div>
                  <div className={styles.tit}>알려드립니다알려드립니다알려드립니다알려드립니다알려드립니다.</div>
                </div>
                {!buttonToggledStates[index] ? 
                <Image src="/icons/chevronDown.svg" alt='펼치기' width={25} height={25} className={styles.down} style={{height : itemHeights[index]-12}} onClick={() => handleToggleClick(index)}/> : 
                <Image src="/icons/chevronUp.svg" alt='닫기' width={25} height={25} className={styles.up} style={{height : itemHeights[index]-12}} onClick={() => handleToggleClick(index)}/>
              }
              {buttonToggledStates[index] &&
                <>
                  <hr/>
                  <div className={styles.txt}>
                    내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
                  </div>
                </>
              }
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}