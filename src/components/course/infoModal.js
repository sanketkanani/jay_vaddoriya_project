import { useEffect } from "react";
import "./modal.css";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { createOrder } from "../../services/Course.service";

const InfoModal = ({
  name,
  price,
  discount_percentage,
  payment_id,
  openInfoModal,
  setOpenInfoModal,
  handleEnrollment,
  handleStudentEnrollment,
  batches,
  id,
}) => {
  const [Razorpay, isLoaded] = useRazorpay();
  const discountedPrice = price - (price * discount_percentage) / 100;

  const handlePayment = useCallback(async () => {
    try {
      const order = await createOrder({ amount: price * 100, currency: "INR" }); // Assuming you need to send amount and currency

      const options = {
        key: "rzp_test_0amUpvjUpYsipq", // Replace with your actual Razorpay Key ID
        amount: price * 100, // Amount in paise
        currency: "INR",
        name: "Maang Careers",
        description: "Test Transaction",
        image:
          "https://dev.maangcareers.in/static/media/Logo_White%201.a5bc8239d8d53248a410948725621d1f.svg", // Replace with your logo URL
        order_id: order.id, // Use the order id returned by the API
        handler: (response) => {
          if (batches?.some((e) => e?.course?.id === id)) {
            handleStudentEnrollment();
          } else {
            handleEnrollment(); // Call your enrollment handler after payment is successful
          }
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  }, [Razorpay, discountedPrice, handleEnrollment]);

  return (
    <div
      className={`modal ${
        openInfoModal ? "modal-open curse_main_price_modal" : ""
      }`}
    >
      <div
        className="modal-overlay"
        onClick={() => setOpenInfoModal(false)}
      ></div>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="font-heading font-bold text-xl mb-3">Order Summary</h1>
        </div>
        <div className="modal-body">
          <div className="font-base space-y-3 mt-5 mb-10 text-gray-800 text-sm bg-gray-200 p-5 rounded">
            <div className="flex justify-between">
              <p>Course Name</p>
              <p>{name}</p>
            </div>
            <div className="flex justify-between">
              <p>Course Price</p>
              <p>₹ {price}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>- ₹ {(price * discount_percentage) / 100}</p>
            </div>
            <div className="h-0.5 w-full bg-white"></div>
            <div className="flex justify-between items-center">
              <p>Final Price</p>
              <p className="font-bold text-base">₹ {discountedPrice}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className=" custom-button font-heading font-semibold text-white rounded text-sm bg-gray-500 px-8"
              onClick={() => setOpenInfoModal(false)}
            >
              Close
            </button>
            <button
              className="custom-button bg-primary text-white"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
