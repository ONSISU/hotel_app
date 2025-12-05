import "@/style/components/common/HotelInfoBottomSheet.css";
import React, { ReactNode, FC, useEffect } from 'react';

type props = {
  isOpen: boolean; // 바텀 시트가 열렸는지 닫혔는지 여부
  onClose: () => void; // 바텀 시트를 닫는 함수
  children: ReactNode;
};

const BottomSheet : FC<props> = ({ isOpen, onClose, children }) => {
  const sheetClass = `bottomSheet ${isOpen ? 'open' : ''}`;

    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={sheetClass}>
        <div className="bottomSheetHeader">
          <h3>판매자 정보</h3>
          <button className="closeButton" onClick={onClose}>×</button>
        </div>
        <div className="bottomSheetContent">
          {children} 
          {}
        </div>
      </div>
    </>
  );
}
export default BottomSheet;