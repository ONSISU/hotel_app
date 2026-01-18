import usePaymentWidget from "./hooks/usePaymentWidget";

export default function PaymentWidget() {

  const {
    goPayment
  } = usePaymentWidget();

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={() => goPayment({})}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>

  );
}