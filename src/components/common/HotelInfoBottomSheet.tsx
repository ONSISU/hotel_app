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
          {<table>
              <tbody>
                <tr>
                  <td className="title">대표자명</td>
                  <td className="text">남대리</td>
                </tr>
                <tr>
                  <td className="title">상호명</td>
                  <td className="text">(주)식은엔비디아</td>
                </tr>
                <tr>
                  <td className="title">사업자주소</td>
                  <td className="text">서울특별시 영등포구 여의도동 1길 1</td>
                </tr>
                <tr>
                  <td className="title">이메일</td>
                  <td className="text">nam0001@naver.com</td>
                </tr>
                <tr>
                  <td className="title">연락처</td>
                  <td className="text">0211112222</td>
                </tr>
                <tr>
                  <td className="title">사업자등록번호</td>
                  <td className="text">1234567890</td>
                </tr>
                <tr>
                  <td className="title">판매업자신고번호</td>
                  <td className="text">2025-멍멍-0001호</td>
                </tr>
              </tbody>
          </table>}
        </div>
      </div>
    </>
  );
}
export default BottomSheet;