import moment from "moment/moment";

export const EmiVariantSelectionModal = ({
  isOpen,
  onClose,
  selectedEmi,
  onVariantSelect,
}) => {
  const handleVariantSelect = (variant) => {
    onVariantSelect(variant);
    onClose();
  };

  if (!isOpen || !selectedEmi) return null;

  return (
    <>
      <h2 className="text-[20px]   font-bold text-primary">
        Select EMI Variant for {selectedEmi.emi_type}
      </h2>
      <ul className="mt-5">
        {selectedEmi.emi_variation.map((variant, index) => (
          <li
            key={index}
            onClick={() =>
              variant?.is_paid
                ? console.log("Already Paid")
                : handleVariantSelect(variant)
            }
            className="bg-primary text-white mb-4"
            style={{
              cursor: "pointer",
              padding: "10px",
              flexDirection: "row",
              display: "flex",
              justifyContent: variant?.is_paid ? "space-between" : "center",
              alignItems: "center",
              borderRadius: "50px",
              fontSize: "18px",
            }}
          >
            Instalment {variant.instalment} - {variant.amount}
            {variant?.is_paid && (
              <img
                src={require("../../assets/thankyou-main-img.png")}
                alt=""
                width={50}
                height={50}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export const EmiSelectionModal = ({
  isOpen,
  onClose,
  emiDetails,
  onEmiSelect,
}) => {
  const handleEmiSelect = (emi) => {
    onEmiSelect(emi);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <h2 className="text-[20px]    font-bold text-primary">
        Select EMI Option
      </h2>
      <ul className="mt-5">
        {emiDetails.map((emi, index) => (
          <li
            key={index}
            onClick={() => handleEmiSelect(emi)}
            className="!mb-4"
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #2db2c4",
              color: "#fff",
              backgroundColor: "#2db2c4",
              maxWidth: "285px",
              margin: "auto",
              borderRadius: "50px",
              fontSize: "18px",
            }}
          >
            {emi.emi_type}
          </li>
        ))}
      </ul>
    </>
  );
};

export const DateSelectionModal = ({
  isOpen,
  onClose,
  dateDetails,
  handleDateSelect,
  setIsEmiModalOpen,
  handleGetEmi,
}) => {
  const handleDate = (date) => {
    handleDateSelect(date);
    onClose();
    handleGetEmi();
  };

  if (!isOpen) return null;
  console.log(dateDetails);

  return (
    <>
      <h2 className="text-[20px]    font-bold text-primary">
        Select Date Option
      </h2>
      <ul className="mt-5">
        {dateDetails.map((date, index) => (
          <li
            key={index}
            onClick={() => handleDate(date)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #2db2c4",
              color: "#fff",
              backgroundColor: "#2db2c4",
              maxWidth: "285px",
              margin: "auto",
              marginBottom: "12px",
              borderRadius: "50px",
              fontSize: "18px",
            }}
          >
            {moment(date, "YYYY-MM-DD").format("MMM-DD")}
          </li>
        ))}
      </ul>
    </>
  );
};
