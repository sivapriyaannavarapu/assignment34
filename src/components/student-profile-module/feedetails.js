// import React from "react";
import TermProgressBar from "./feetracker";
import { useStudentMajorInfo } from "../../backend/queries";

const FeeDetails = ({ isOpen, onToggle }) => {
      const{data, isLoading, isError, error} = useStudentMajorInfo();
    console.log(data);

    if (isLoading) {
    return <div className="container-fluid px-0 mt-4">Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="container-fluid px-0 mt-4">
        Error: {error?.message || "Failed to load student profile"}
      </div>
    );
  }

//   Handle no data
  if (!data) {
    return (
      <div className="container-fluid px-0 mt-4">
        No student profile data available.
      </div>
    );
  }
    return (
        <div className="bg-white mb-2 px-3 py-2 rounded shadow-sm" style={{}}>
            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center"
                onClick={onToggle}
                style={{ cursor: "pointer", height: "35px" }}
            >
                {/* Left: Icon + Title */}
                <div className="d-flex align-items-center gap-2">
                    {/* Folder Icon - replace with your own SVG */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.83958 0.833344C8.71133 0.83426 9.54183 1.25043 10.0625 1.94618L10.8976 3.05718C11.1625 3.40918 11.5832 3.61909 12.0232 3.62001H14.6165C18.1567 3.62001 19.8057 5.43409 19.8057 9.32901L19.7801 13.8821C19.7792 17.5194 17.5187 19.7799 13.8795 19.7799H6.746C3.0995 19.7799 0.833496 17.5185 0.833496 13.8793V6.73026C0.833496 2.81701 2.57425 0.833344 6.00625 0.833344H7.83958ZM7.83866 2.20834H6.00625C3.34425 2.20834 2.2085 3.56134 2.2085 6.73026V13.8793C2.2085 16.798 3.82 18.4049 6.746 18.4049H13.8795C16.7982 18.4049 18.4051 16.798 18.4051 13.8793V13.8766L18.4307 9.32534C18.4307 6.20959 17.3619 4.99501 14.6165 4.99501H12.0223C11.1524 4.99409 10.3219 4.57884 9.79941 3.88401L8.9625 2.77118C8.69941 2.41826 8.27866 2.20926 7.83866 2.20834ZM14.3233 12.0284C14.7028 12.0284 15.0108 12.3364 15.0108 12.7159C15.0108 13.0954 14.7028 13.4034 14.3233 13.4034H6.31626C5.93676 13.4034 5.62876 13.0954 5.62876 12.7159C5.62876 12.3364 5.93676 12.0284 6.31626 12.0284H14.3233Z" fill="#56555C" />
                    </svg>

                    <strong className="text-muted " style={{ fontSize: '15px', fontWeight: '500' }}>Fee Details</strong>
                </div>

                {/* Right: + Payment, ProgressBar, Arrow */}
                <div className="d-flex align-items-center gap-2">

                    {/* Scale down the progress bar to reduce height impact */}
                    <div style={{ transform: "scale(0.9)", transformOrigin: "right center" }}>
                        <TermProgressBar currentTerm={1} amount={46000} label="Term" />
                    </div>

                    {isOpen ? (
                        // Up Arrow SVG
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6L6 1L11 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        // Down Arrow SVG
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Expandable Content */}
            {isOpen && (
                <div className="mt-4 px-2 fw-normal" style={{ color: "#9D9BA1", fontStyle: "normal" }}>
                    <div className="row gy-3">
                        <div className="col-md-6">
                            <FeeItem label="Course Fee" value={data.courseFee || 'N/A'} />
                            <FeeItem label="Add’l Amount" value={data.addiAmount || 'N/A'} />
                            <FeeItem label="Concession" value={data.concession || 'N/A'} />
                            <FeeItem label="Net Fee" value={data.netFee || 'N/A'} />
                            <FeeItem label="Service Tax Paid" value={data.serviceTaxPaid || 'N/A'} />
                        </div>
                        <div className="col-md-6">
                            <FeeItem label="Fee Paid" value={data.feePaid || 'N/A'} />
                            <FeeItem label="Fee Deduction" value={data.feeDeducation || 'N/A'} />
                            <FeeItem label="Fee Refund" value={data.feeRefund || 'N/A'} />
                            <FeeItem label="Over All Due" value={data.overAlldue || 'N/A'} />
                            <FeeItem label="Service tax to be Paid" value={data.serviceTaxToBePaid || 'N/A'} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FeeItem = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-center mb-2">
        {/* Label */}
        <span
            style={{
                color: "#82808F",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "normal",
            }}
        >
            {label}
        </span>

        {/* Value */}
        <span
            style={{
                color: "#9D9BA1",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "normal",
                padding: "2px 8px",
                borderRadius: "6px",
                backgroundColor: "#F3F3F3", // optional background
                textAlign: "center",
            }}
        >
            {value}
        </span>
    </div>
);


export default FeeDetails;