import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useState, useRef, useEffect } from "react";

interface PayParams {
  orderId?: string;
  orderName?: string;
  customerName?: string;
  customerEmail?: string;
  successUrl?: string;
  failUrl?: string;
}

export default function usePaymentWidget() {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any>(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50_000,
  });
  const paymentMethodWidgetRef = useRef(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_KEY!);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      /**
       * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
       * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
       */
      await widgets.setAmount(amount);


      const [paymentMethodWidget] = await Promise.all([
        /**
         * 결제창을 렌더링합니다.
         * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
         */
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        /**
         * 약관을 렌더링합니다.
         * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
         */
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      /**
       * 결제수단 선택 이벤트를 등록합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#paymentmethodwidgeton
       */
      paymentMethodWidget.on("paymentMethodSelect", (selectedPaymentMethod: { code: string; }) => {
        console.log("selectedPaymentMethod: ", selectedPaymentMethod);

        if (selectedPaymentMethod.code === "CARD") {
          // 카드 안내사항 노출
        }
        if (selectedPaymentMethod.code === "문화바우처") {
          // 커스텀 결제수단 (결제위젯 Pro 플랜 기능)
          // 문화바우처 안내사항 노출
        }
      });

      paymentMethodWidgetRef.current = paymentMethodWidget;

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  const goPayment = async (params: PayParams) => {

    /**
     * 선택된 결제수단을 조회합니다.
     * @docs https://docs.tosspayments.com/sdk/v2/js#paymentmethodwidgetgetselectedpaymentmethod
     */
    // const selectedPaymentMethod = await paymentMethodWidgetRef.current?.getSelectedPaymentMethod();
    // console.log("selectedPaymentMethod: ", selectedPaymentMethod);

    await widgets?.requestPayment({
      orderId: params.orderId || 'adsfnwoiqn',
      orderName: params.orderName || "토스 티셔츠 외 2건",
      customerName: params.customerName || "김토스",
      customerEmail: params.customerEmail || "customer123@gmail.com",
      successUrl: window.location.origin + "/sandbox/success" + window.location.search,
      failUrl: window.location.origin + "/sandbox/fail" + window.location.search
    });
  }

  return {
    goPayment
  }
}