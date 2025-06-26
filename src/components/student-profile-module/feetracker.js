// import React, { useState } from "react";
import { useStudentMajorInfo } from "../../backend/queries";
const TermProgressBar = ({ currentTerm = 1, amount = 10000, label = "Term" }) => {

  //  const{data, isLoading, isError, error} = useStudentMajorInfo();
  //     console.log(data);
  
  //     if (isLoading) {
  //     return <div className="container-fluid px-0 mt-4">Loading...</div>;
  //   }
  
  //   // Handle error state
  //   if (isError) {
  //     return (
  //       <div className="container-fluid px-0 mt-4">
  //         Error: {error?.message || "Failed to load student profile"}
  //       </div>
  //     );
  //   }
  
  // //   Handle no data
  //   if (!data) {
  //     return (
  //       <div className="container-fluid px-0 mt-4">
  //         No student profile data available.
  //       </div>
  //     );
  //   }
  const getColor = (index) => {
    if (index + 1 < currentTerm) return "#4CAF50"; // completed → green
    if (index + 1 === currentTerm) return "#E53935"; // active → red
    return "#D9D9D9"; // upcoming → gray
  };

  return (
    <div className="d-flex flex-column align-items-end">
      <div className="d-flex align-items-center gap-4  mb-1" style={{marginRight: "9px"}}>
        <span style={{ color: "#6B6B6B", fontWeight: 500, marginRight:'10px', fontSize:'12px' }}>
          {label} {currentTerm}
        </span>
        <span style={{ color: "#E53935", fontWeight: 500, fontSize: "0.8rem" }}>
          {amount.toLocaleString()}
        </span>
      </div>

      <div style={{ display: "flex", width: "114px", height: "5px", gap: "3px" }}>
        {[0, 1, 2].map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              backgroundColor: getColor(index),
              transform: "skewX(-20deg)",
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TermProgressBar;