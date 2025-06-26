import React, { useState, useRef } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import DDDetails from "./DDDetails";
import PaymentForm from "./PaymentForm";
import FeeHeadModal from "./FeeHeadModal";
import { toWords } from "number-to-words";
import blur from "../../assets/blur.png";
import { useDueTotal } from "../../backend/queries";
import { useStudentContext } from "../customHooks/StudentContext";
import { addPayment } from "../../backend/apis";
 
const Payments = () => {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [term, setTerm] = useState("term1");
  const [amount, setAmount] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDDDetails, setShowDDDetails] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("Step 1");
  const [feeItems, setFeeItems] = useState([]);
  const { data } = useDueTotal();
  const { studentId } = useStudentContext();
  const formRef = useRef();
 
  const feeHeads = [
    { id: 1, name: "Pocket Money" },
    { id: 2, name: "Transport Fee" },
    { id: 3, name: "Exam Fee" },
    { id: 4, name: "Uniform Fee" },
    { id: 5, name: "Akash Books Fee" },
    { id: 6, name: "Material Fee" },
  ];
 
  const handlePaymentModeChange = (mode) => {
    setPaymentMode(mode);
    if (mode !== "DD") {
      setShowDDDetails(false);
      setProgress(0);
      setStep("Step 1");
    } else {
      setShowDDDetails(false);
      setProgress(50);
      setStep("Step 1");
    }
  };
 
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const number = parseInt(value.replace(/[^0-9]/g, ""), 10);
    setAmountInWords(!isNaN(number) ? toWords(number) : "");
  };
 
  const addFeeItem = (feeHead) => {
    // Check if a fee item with the same feeHeadId already exists
    const exists = feeItems.some((item) => item.feeHeadId === feeHead.id);
    if (exists) {
      console.warn(`Fee head "${feeHead.name}" is already added.`);
      setShowModal(false);
      return;
    }

    const parsedAmount = parseInt(amount) || 0;
    if (parsedAmount <= 0) {
      console.warn("Amount must be greater than 0 to add a fee item.");
      setShowModal(false);
      return;
    }
 
    const newItem = {
      amount: parseInt(amount) || 0,
      feeHeadId: feeHead.id,
      name: feeHead.name,
      description: `Payment for ${feeHead.name}`,
    };
    setFeeItems([...feeItems, newItem]);
    setShowModal(false);
  };
 
  const handleSubmit = async () => {
    console.log("Print Receipt button clicked");
    if (formRef.current) {
      try {
        await formRef.current.handleSubmit();
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    } else {
      console.warn("formRef is not available");
    }
  };
 
  const handleFormSubmit = async (formData) => {
    console.log("handleFormSubmit called with data:", formData);
    try {
      // Initialize DTO fields
      let pocketMoneyAmount = 0;
      let akashBooksAmount = null;
      let courseFeeAmount = parseInt(formData.amount) || 0; // Amount from PaymentForm (course fee)
 
      // Process feeItems to map amounts for Pocket Money and Akash Books Fee
      // formData.feeItems?.forEach((item) => {
      //   if (item.name === "Pocket Money") {
      //     pocketMoneyAmount += parseInt(item.amount) || 0;
      //   } else if (item.name === "Akash Books Fee") {
      //     akashBooksAmount = parseInt(item.amount) || null;
      //   } else {
      //     // Other fee heads contribute to courseFeeAmount (Material Fee, id: 6)
      //     courseFeeAmount += parseInt(item.amount) || 0;
      //   }
      // });
 
      const payload = {
        amount: courseFeeAmount,
        class_type: "",
        feeHeadId: 6, // Always set to 6 (Material Fee) for course fee
        pocket_money_amount: pocketMoneyAmount,
        modeOfPayment: formData.modeOfPayment || paymentMode,
        pre_print_reciept_no: parseInt(formData.pre_print_reciept_no) || 0,
        bank_details: "",
        amountIn: formData.amountIn || "",
        akashBooks: akashBooksAmount,
        description: formData.description || "",
        check_no: parseInt(formData.cheque_amount) || null,
        check_date: null,
        fee_payment_year: formData.fee_payment_year || null,
      };
 
      console.log("Sending payload to backend:", payload);
      const result = await addPayment(studentId, payload);
      console.log("Payment added successfully:", result);
    } catch (error) {
      console.error("Error adding payment:", error.response?.data || error.message);
    }
  };
 
  console.log(data);
 
  return (
    <div
      className="payment"
      style={{
        height: "47vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        padding: "20px",
        position: "relative",
        paddingTop: "0px",
      }}
    >
      {showModal && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${blur})`,
            backgroundSize: "cover",
            zIndex: 10,
            borderRadius: 1,
            overflow: "hidden",
            opacity: "50%",
            pointerEvents: "none",
          }}
        />
      )}
 
      <FeeHeadModal
        showModal={showModal}
        setShowModal={setShowModal}
        feeHeads={feeHeads}
        addFeeItem={addFeeItem}
      />
 
      {!showModal && (
        <>
          <div className="payments_top d-flex justify-content-between">
            <div className="payments_top_left d-flex flex-column">
              <div style={{ marginBottom: "0px", fontSize: "12px", fontWeight: "400" }}>
                Due Amount
              </div>
              <div
                style={{
                  backgroundColor: "#E9E9E9",
                  marginTop: "2px",
                  marginBottom: "0px",
                  padding: "3px 13px",
                  borderRadius: "5px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                4000
              </div>
            </div>
            <div
              className="border rounded-5 p-1"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F7F7F7",
                border: "1px solid #D2D2D2",
                borderRadius: "110px",
              }}
            >
              <div
                className="btn-group rounded-3 gap-2"
                role="group"
                style={{ height: "90%", borderRadius: "110px" }}
              >
                {["Cash", "DD", "Cheque", "Credit/Debit Card"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`btn ${paymentMode === mode ? "btn-primary" : ""}`}
                    onClick={() => handlePaymentModeChange(mode)}
                    style={{
                      padding: "7px 20px",
                      borderRadius: "110px",
                      border: "none",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <Box sx={{ width: "100px" }}>
              {paymentMode === "DD" ? (
                <Box sx={{ width: "100px", textAlign: "left", position: "relative" }}>
                  <Typography variant="caption" sx={{ fontSize: 12, color: "#333" }}>
                    {step}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: "10px",
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#1E90FF",
                        borderRadius: "5px 0 0 5px",
                      },
                    }}
                  />
                  {paymentMode === "DD" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "2px",
                        height: "50%",
                        backgroundColor: "#fff",
                        transform: "translateX(-50% 6px)",
                        transformOrigin: "center",
                        zIndex: 1,
                      }}
                    />
                  )}
                </Box>
              ) : (
                <Box sx={{ height: "10px" }} />
              )}
            </Box>
          </div>
          {!showDDDetails && (
            <PaymentForm
              paymentMode={paymentMode}
              term={term}
              setTerm={setTerm}
              amount={amount}
              handleAmountChange={handleAmountChange}
              amountInWords={amountInWords}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              feeItems={feeItems}
              onSubmit={handleFormSubmit}
              formRef={formRef}
            />
          )}
          {showDDDetails ? (
            <DDDetails
              onBack={() => {
                setShowDDDetails(false);
                setProgress(50);
                setStep("Step 1");
              }}
              onPrint={() => setProgress(100)}
            />
          ) : (
            paymentMode === "DD" && (
              <Box textAlign="center" mt={5}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#3425FF", textTransform: "capitalize" }}
                  endIcon={<ArrowForward />}
                  onClick={() => {
                    setShowDDDetails(true);
                    setProgress(100);
                    setStep("Step 2");
                  }}
                >
                  Proceed
                </Button>
              </Box>
            )
          )}
          {paymentMode !== "DD" && !showDDDetails && (
            <Box textAlign="center" mt={5} sx={{ zIndex: 20, position: "relative" }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  borderRadius: "6px",
                  background: "#3425FF",
                  textTransform: "capitalize",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                  pointerEvents: "auto",
                }}
                onClick={handleSubmit}
              >
                Print Receipt
              </Button>
            </Box>
          )}
        </>
      )}
    </div>
  );
};
 
export default Payments;