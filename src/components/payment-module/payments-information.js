import { useState } from "react";
import "../../styles/payments-information.css"
import { useStudentMajorInfo } from "../../backend/queries";
const PaymentInformation = () => {

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

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="payment_information px-2 border-start border-top">
            {/* Header */}
            <div className="d-flex align-items-center gap-2 border-bottom border-bottom-custom mb-2 mt-3 ">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M13.7362 0.833344H16.84C18.1254 0.833344 19.1669 1.88371 19.1669 3.17998V6.30999C19.1669 7.60626 18.1254 8.65662 16.84 8.65662H13.7362C12.4507 8.65662 11.4092 7.60626 11.4092 6.30999V3.17998C11.4092 1.88371 12.4507 0.833344 13.7362 0.833344Z" fill="#56555C" />
                    <path d="M6.26428 11.3434C7.54969 11.3434 8.59126 12.3938 8.59126 13.69V16.82C8.59126 18.1154 7.54969 19.1667 6.26428 19.1667H3.16048C1.87506 19.1667 0.833496 18.1154 0.833496 16.82V13.69C0.833496 12.3938 1.87506 11.3434 3.16048 11.3434H6.26428ZM16.8398 11.3434C18.1253 11.3434 19.1668 12.3938 19.1668 13.69V16.82C19.1668 18.1154 18.1253 19.1667 16.8398 19.1667H13.736C12.4506 19.1667 11.4091 18.1154 11.4091 16.82V13.69C11.4091 12.3938 12.4506 11.3434 13.736 11.3434H16.8398ZM6.26428 0.833344C7.54969 0.833344 8.59126 1.88371 8.59126 3.17998V6.30999C8.59126 7.60626 7.54969 8.65662 6.26428 8.65662H3.16048C1.87506 8.65662 0.833496 7.60626 0.833496 6.30999V3.17998C0.833496 1.88371 1.87506 0.833344 3.16048 0.833344H6.26428Z" fill="#56555C" />
                </svg>
                <h6 className="text-dark">Information</h6>
            </div>

            <div className="card shadow-sm border-1 rounded-3">
                {/* Header */}
                <div
                    className="d-flex justify-content-between align-items-center px-3 pt-3 pb-2"
                    role="button"
                    onClick={toggleDropdown}
                    style={{ cursor: "pointer" }}
                >
                    <div className="d-flex align-items-center gap-2  ">
                        {/* SVG Icon */}
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M14.7416 7.26929C14.3277 7.26929 13.7795 7.26012 13.0969 7.26012C11.4323 7.26012 10.0636 5.88237 10.0636 4.20212V1.25412C10.0636 1.02221 9.87842 0.833374 9.64878 0.833374H4.80015C2.5374 0.833374 0.708496 2.69054 0.708496 4.96662V14.8437C0.708496 17.2316 2.62453 19.1667 4.98894 19.1667H12.2092C14.4638 19.1667 16.2918 17.3215 16.2918 15.0435V7.68179C16.2918 7.44896 16.1076 7.26104 15.877 7.26196C15.4895 7.26471 15.0248 7.26929 14.7416 7.26929Z" fill="#56555C" />
                            <path opacity="0.4" d="M12.2438 1.35342C11.9697 1.06834 11.4912 1.26451 11.4912 1.65959V4.07684C11.4912 5.09067 12.3263 5.92484 13.3401 5.92484C13.979 5.93217 14.8664 5.93401 15.6199 5.93217C16.0058 5.93126 16.202 5.47017 15.9343 5.19151C14.9672 4.18592 13.2356 2.38376 12.2438 1.35342Z" fill="#56555C" />
                            <path d="M10.7169 12.6517C11.0936 12.6517 11.3998 12.9579 11.3998 13.3347C11.3998 13.7114 11.0936 14.0167 10.7169 14.0167H5.72653C5.34978 14.0167 5.04453 13.7114 5.04453 13.3347C5.04453 12.9579 5.34978 12.6517 5.72653 12.6517H10.7169ZM8.82935 8.07373C9.2061 8.07373 9.51227 8.3799 9.51227 8.75665C9.51227 9.1334 9.2061 9.43865 8.82935 9.43865H5.72643C5.34968 9.43865 5.04443 9.1334 5.04443 8.75665C5.04443 8.3799 5.34968 8.07373 5.72643 8.07373H8.82935Z" fill="#56555C" />
                        </svg>

                        <span className=" custoum-heading1">Payment Details</span>
                        {/* <hl/> */}
                    </div>

                    {/* Chevron */}
                    <svg
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17 10L12 15L7 10"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Dropdown body */}
                {isOpen && (
                    <div className="card-body pt-2 pb-3">
                        <div className="mb-3 d-flex justify-content-between align-items-center custoum-heading">
                            <strong>Select Class</strong>
                            <select className="form-select form-select-sm" style={{ width: "153px" ,color:"#000000" ,fontWeight:"600", backgroundColor:''}}>
                                <option>class 1</option>
                                <option>class 2</option>
                                <option>class 3</option>
                                <option>class 4</option>
                                <option>class 5</option>
                                <option>class 6</option>
                                <option>class 8</option>
                                <option>class 9</option>
                                <option>class 10</option>
                                <option>Inter 1</option>
                                <option selected>Inter 2</option>
                            </select>
                        </div>

                        {/* Fee Rows */}
                        {[
                            ["Course Fee", data?.courseFee || 'N/A'],
                            ["Additional Amount", data?.addiAmount || 'N/A'],
                            ["Concession", data?.concession || 'N/A'],
                            ["Net Fee", data?.netFee || 'N/A'],
                            ["Service Tax Paid", data?.serviceTaxPaid || 'N/A'],
                            ["Fee Paid", data?.feePaid || 'N/A'],
                            ["Fee Refunded", data?.feeRefund || 'N/A'],
                            ["Over All Due", data?.overAlldue || 'N/A'],
                        ].map(([label, value], index) => (
                            <div className="d-flex justify-content-between mb-1 custoum-text" key={index}>
                                <span>{label}</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>

            );
};

            export default PaymentInformation;