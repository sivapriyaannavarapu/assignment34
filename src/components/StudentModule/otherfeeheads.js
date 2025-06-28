import { useStudentMajorInfo } from "../../backend/queries";
const OtherFeeHeads = ({ isOpen, onToggle }) => {

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
        <div className="bg-white mb-2 p-3 rounded shadow-sm">
            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center"
                onClick={onToggle}
                style={{ cursor: "pointer" }}
            >
                <div className="d-flex align-items-center gap-2">
                    {/* Replace with your custom SVG */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83909 0.833344C8.71084 0.83426 9.54134 1.25043 10.062 1.94618L10.8971 3.05718C11.162 3.40918 11.5828 3.61909 12.0228 3.62001H14.616C18.1562 3.62001 19.8053 5.43409 19.8053 9.32901L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73026C0.833008 2.81701 2.57376 0.833344 6.00576 0.833344H7.83909ZM7.83817 2.20834H6.00576C3.34376 2.20834 2.20801 3.56134 2.20801 6.73026V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32534C18.4303 6.20959 17.3614 4.99501 14.616 4.99501H12.0218C11.1519 4.99409 10.3214 4.57884 9.79892 3.88401L8.96201 2.77118C8.69892 2.41826 8.27817 2.20926 7.83817 2.20834ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z" fill="#56555C" />
                    </svg>

                    <strong className="text-muted" style={{fontWeight:'500', fontSize:'15px'}}> Other Fee Heads</strong>
                </div>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center " style={{ gap: "45px", marginRight: "15px", fontSize:'12px' }}>
                        <span style={{ color: "#6B6B6B", fontWeight: 500 }}>Pending:</span>
                        <span style={{ color: "#08B61A", fontWeight: 700 }}>0</span> 
                    </div>
                    <div>
                        {/* Custom SVG based on isOpen */}
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
            </div>

            {/* Content */}
            {isOpen && (
                <div className="mt-4 px-2 ps-4" style={{  fontFamily: 'Inter, sans-serif' }}>
                    <div className="row">
                        {/* Left column */}
                        <div className="col-md-6 d-flex flex-column gap-2">
                            <FeeItem label="Akash Books" value={data.akash_books || 'N/A'} />
                            <FeeItem label="Bus Pass" value={data.bus_pss || 'N/A'} />
                            <FeeItem label="Caution Deposit" value={data.caution_deposite || 'N/A'} />
                            <FeeItem label="CRD Books" value={data.crd_books || 'N/A'} />
                        </div>

                        {/* Right column */}
                        <div className="col-md-6 d-flex flex-column gap-2">
                            <FeeItem label="Miscella neous" value={data.miscellaneous || 'N/A'} />
                            <FeeItem label="STD Welfare Fund" value={data.std_welfare_fund || 'N/A'} />
                            <FeeItem label="Material" value={data.material || 'N/A'} />
                            <FeeItem label="EAMCET App Fee" value={data.eamcet_app_fee || 'N/A'} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable item
const FeeItem = ({ label, value }) => (
    <div className="d-flex align-items-center justify-content-between">
        <span className="text-muted" style={{ minWidth: "140px", fontWeight: '500',color:'#82808F', fontSize:'12px', lineHeight:'normal' }}>{label}</span>
        <span
            className="px-3 py-1"
            style={{
                color: "#9D9BA1",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "normal",
                padding: "2px 8px",
                borderRadius: "6px",
                backgroundColor: "#F3F3F3",
                textAlign: "center",
            }}
        >
            {value}
        </span>
    </div>
);

export default OtherFeeHeads;



// import { useStudentMajorInfo } from "../../backend/queries";
// const OtherFeeHeads = ({ isOpen, onToggle }) => {

//     //  const{data, isLoading, isError, error} = useStudentMajorInfo();
//     //     console.log(data);
    
//     //     if (isLoading) {
//     //     return <div className="container-fluid px-0 mt-4">Loading...</div>;
//     //   }
    
//     //   // Handle error state
//     //   if (isError) {
//     //     return (
//     //       <div className="container-fluid px-0 mt-4">
//     //         Error: {error?.message || "Failed to load student profile"}
//     //       </div>
//     //     );
//     //   }
    
//     // //   Handle no data
//     //   if (!data) {
//     //     return (
//     //       <div className="container-fluid px-0 mt-4">
//     //         No student profile data available.
//     //       </div>
//     //     );
//     //   }
//     return (
//         <div className="bg-white mb-2 p-3 rounded shadow-sm">
//             {/* Header */}
//             <div
//                 className="d-flex justify-content-between align-items-center"
//                 onClick={onToggle}
//                 style={{ cursor: "pointer" }}
//             >
//                 <div className="d-flex align-items-center gap-2">
//                     {/* Replace with your custom SVG */}
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83909 0.833344C8.71084 0.83426 9.54134 1.25043 10.062 1.94618L10.8971 3.05718C11.162 3.40918 11.5828 3.61909 12.0228 3.62001H14.616C18.1562 3.62001 19.8053 5.43409 19.8053 9.32901L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73026C0.833008 2.81701 2.57376 0.833344 6.00576 0.833344H7.83909ZM7.83817 2.20834H6.00576C3.34376 2.20834 2.20801 3.56134 2.20801 6.73026V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32534C18.4303 6.20959 17.3614 4.99501 14.616 4.99501H12.0218C11.1519 4.99409 10.3214 4.57884 9.79892 3.88401L8.96201 2.77118C8.69892 2.41826 8.27817 2.20926 7.83817 2.20834ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z" fill="#56555C" />
//                     </svg>

//                     <strong className="text-muted" style={{fontWeight:'500', fontSize:'15px'}}> Other Fee Heads</strong>
//                 </div>

//                 <div className="d-flex align-items-center">
//                     <div className="d-flex align-items-center " style={{ gap: "45px", marginRight: "15px", fontSize:'12px' }}>
//                         <span style={{ color: "#6B6B6B", fontWeight: 500 }}>Pending:</span>
//                         <span style={{ color: "#08B61A", fontWeight: 700 }}>0</span> 
//                     </div>
//                     <div>
//                         {/* Custom SVG based on isOpen */}
//                         {isOpen ? (
//                             // Up Arrow SVG
//                             <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M1 6L6 1L11 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         ) : (
//                             // Down Arrow SVG
//                             <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Content */}
//             {isOpen && (
//                 <div className="mt-4 px-4" style={{  fontFamily: 'Inter, sans-serif' }}>
//                     <div className="row">
//                         {/* Left column */}
//                         <div className="col-md-6 d-flex flex-column gap-2">
//                             <FeeItem label="Akash Books" value={'N/A'} />
//                             <FeeItem label="Bus Pass" value={'N/A'} />
//                             <FeeItem label="Caution Deposit" value={'N/A'} />
//                             <FeeItem label="CRD Books" value={'N/A'} />
//                         </div>

//                         {/* Right column */}
//                         <div className="col-md-6 d-flex flex-column gap-2">
//                             <FeeItem label="Miscella neous" value={'N/A'} />
//                             <FeeItem label="STD Welfare Fund" value={'N/A'} />
//                             <FeeItem label="Material" value={'N/A'} />
//                             <FeeItem label="EAMCET App Fee" value={'N/A'} />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Reusable item
// const FeeItem = ({ label, value }) => (
//     <div className="d-flex align-items-center justify-content-between">
//         <span className="text-muted" style={{ minWidth: "140px", fontWeight: '500',color:'#82808F', fontSize:'12px', lineHeight:'normal' }}>{label}</span>
//         <span
//             className="px-3 py-1"
//             style={{
//                 color: "#9D9BA1",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 lineHeight: "normal",
//                 padding: "2px 8px",
//                 borderRadius: "6px",
//                 backgroundColor: "#F3F3F3",
//                 textAlign: "center",
//             }}
//         >
//             {value}
//         </span>
//     </div>
// );

// export default OtherFeeHeads;