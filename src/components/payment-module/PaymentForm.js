
import React from "react";
import {
  Box,
  ToggleButton,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Formik, Form, FieldArray } from "formik";
import FeeItem from "./FeeItem";

// Debug check for useRef and useContext
if (!React.useRef) {
  console.error("React.useRef is not available. Check React import and version.");
}
if (!React.useContext) {
  console.error("React.useContext is not available. Check React import and version.");
}

const PaymentForm = ({
  paymentMode,
  term,
  setTerm,
  amount,
  handleAmountChange,
  amountInWords,
  setShowModal,
  selectedDate,
  setSelectedDate,
  feeItems,
  onSubmit,
  formRef, // Accept formRef prop
}) => {
  const termOptions = ["term1", "term2", "term3"];

  return (
    <Formik
      initialValues={{
        feeItems: feeItems || [],
        amount: amount || "",
        description: "",
        pre_print_reciept_no: "",
        cheque_amount: "",
        fee_payment_year: selectedDate || "",
        modeOfPayment: paymentMode,
      }}
      enableReinitialize
      onSubmit={(values) => {
        console.log("Formik onSubmit triggered with values:", values); // Debug log
        onSubmit({
          ...values,
          amountIn: amountInWords,
          fee_payment_year: values.fee_payment_year || selectedDate,
          modeOfPayment: paymentMode,
        });
      }}
      innerRef={formRef} // Bind Formik instance to formRef
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form id="payment-form">
          <Box sx={{ position: "relative", mx: "1" }}>
            <Box
              value={term}
              exclusive
              onChange={(_, newTerm) => newTerm && setTerm(newTerm)}
              sx={{
                position: "absolute",
                display: "flex",
                gap: 1,
                top: 0,
                left: 20,
                transform: "translateY(-50%)",
                borderRadius: 8,
                zIndex: 1,
              }}
            >
              {termOptions.map((val, i) => (
                <ToggleButton
                  key={val}
                  value={val}
                  selected={term === val}
                  onChange={() => setTerm(val)}
                  sx={{
                    color: "black",
                    borderRadius: "23px",
                    px: 2,
                    py: 0.5,
                    fontWeight: 400,
                    border: "1px solid #BFBFBF",
                    backgroundColor: "white",
                    textTransform: "capitalize",
                    "&:hover": { bgcolor: "white" },
                    "&.Mui-selected": {
                      bgcolor: "#1E1EFF",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1E1EFF" },
                    },
                  }}
                >
                  {`term fee ${i + 1}`}
                </ToggleButton>
              ))}
            </Box>
            <Box
              sx={{
                mt: 4,
                border: "1px solid #E6E6E6",
                borderRadius: "12px",
                px: 2,
                py: 4,
                backgroundColor: "#FAFAFA",
                height: "auto",
              }}
            >
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  name="amount"
                  label="Enter Amount"
                  variant="outlined"
                  value={values.amount}
                  type="number"
                  onChange={(e) => {
                    handleAmountChange(e);
                    handleChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{
                    onWheel: (e) => e.target.blur(),
                    inputMode: "numeric",
                    style: { MozAppearance: "textfield" },
                  }}
                  sx={{
                    width: "220px",
                    borderRadius: "6px",
                    backgroundColor: "#ffff",
                    "& .MuiInputLabel-root": {
                      color: "#404040 !important",
                      fontSize: "12px",
                      fontWeight: 400,
                      transform: "translate(14px, 12px)",
                      "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -7px) scale(0.75)",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "& input": {
                        padding: "14px 14px",
                        justifyContent: "center",
                        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        MozAppearance: "textfield",
                      },
                      "& fieldset": { borderColor: "#7D7D7D !important" },
                      "&:hover fieldset": { borderColor: "#7D7D7D !important" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#7D7D7D !important",
                        borderWidth: "1px !important",
                      },
                    },
                  }}
                />
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={values.description}
                  onChange={handleChange}
                  sx={{
                    flex: 2,
                    borderRadius: "6px",
                    backgroundColor: "#ffff",
                    "& .MuiInputLabel-root": {
                      color: "#404040 !important",
                      fontSize: "12px",
                      fontWeight: 400,
                      transform: "translate(14px, 12px)",
                      "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -7px) scale(0.75)",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "& fieldset": { borderColor: "#7D7D7D !important" },
                      "&:hover fieldset": { borderColor: "#7D7D7D !important" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#7D7D7D !important",
                        borderWidth: "1px !important",
                      },
                    },
                  }}
                />
              </Box>
              <Typography
                sx={{
                  mt: 1,
                  color: amountInWords ? "green" : "orangered",
                  fontSize: 13,
                }}
              >
                * {amountInWords ? ` ${amountInWords}` : "Amount in words will display here"}
              </Typography>
            </Box>
          </Box>
          <FieldArray name="feeItems">
            {({ remove }) => (
              <>
                {values.feeItems.map((item, index) => (
                  <FeeItem
                    key={index}
                    feeItem={item}
                    index={index}
                    remove={remove}
                  />
                ))}
              </>
            )}
          </FieldArray>
          <div className="row d-flex m-1 mt-3">
            {paymentMode !== "Cash" && (
              <div className="col-4">
                <TextField
                  name="cheque_amount"
                  label="Cheque Amount"
                  variant="outlined"
                  type="number"
                  value={values.cheque_amount}
                  onChange={handleChange}
                  sx={{
                    width: "80%",
                    borderRadius: "6px",
                    "& .MuiInputLabel-root": {
                      color: "#404040",
                      fontSize: "12px",
                      fontWeight: 400,
                      transform: "translate(14px, 12px)",
                      "&.Mui-focused": {
                        transform: "translate(14px, -7px) scale(0.75)",
                      },
                      "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -7px) scale(0.75)",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "& fieldset": { borderColor: "#7D7D7D" },
                      "&:hover fieldset": { borderColor: "#7D7D7D" },
                      "&.Mui-focused fieldset": { borderColor: "#7D7D7D" },
                    },
                  }}
                />
              </div>
            )}
            <div className="col-4">
              <TextField
                name="pre_print_reciept_no"
                label="Pre Print Receipt No"
                variant="outlined"
                type="number"
                value={values.pre_print_reciept_no}
                onChange={handleChange}
                sx={{
                  width: "80%",
                  borderRadius: "6px",
                  "& .MuiInputLabel-root": {
                    color: "#404040",
                    fontSize: "12px",
                    fontWeight: 400,
                    transform: "translate(14px, 12px)",
                    "&.Mui-focused": { color: "#404040" },
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -7px) scale(0.75)",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& fieldset": { borderColor: "#7D7D7D" },
                    "&:hover fieldset": { borderColor: "#7D7D7D" },
                    "&.Mui-focused fieldset": { borderColor: "#7D7D7D" },
                  },
                }}
              />
            </div>
            <div className="col-4">
              <TextField
                name="fee_payment_year"
                label="Pay Date"
                type="date"
                variant="outlined"
                value={values.fee_payment_year}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setFieldValue("fee_payment_year", e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: "80%",
                  borderRadius: "6px",
                  "& .MuiInputLabel-root": {
                    color: "#404040",
                    "&.Mui-focused": { color: "#404040" },
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& fieldset": { borderColor: "#7D7D7D" },
                    "&:hover fieldset": { borderColor: "#7D7D7D" },
                    "&.Mui-focused fieldset": { borderColor: "#7D7D7D" },
                  },
                }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowModal(true)}
            sx={{
              mt: 3,
              borderRadius: "5px",
              textTransform: "capitalize",
              marginLeft: "270px",
              width: "40%",
              textAlign: "center",
              backgroundColor: "#B6B1FF",
              fontSize: "12px",
              fontWeight: 400,
              boxShadow: "none",
              color: "black",
              "&:hover": { boxShadow: "none" },
            }}
          >
            <Add sx={{ fontSize: 16, mr: 1 }} />
            Add Fee Head
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
