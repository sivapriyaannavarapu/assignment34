// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ScLogo from '../../assets/scLogo.png';
import ModrenLogo from '../../assets/modernLogo.png';
import { useStudentMajorInfo } from '../../backend/queries';

const PocketMoney = ({ isOpen, onToggle }) => {
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
        <div className="bg-white mb-2 p-3 rounded shadow-sm" style={{}}>
            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center"
                onClick={onToggle}
                style={{ cursor: "pointer", height: "18px" }}
            >
                <div className="d-flex align-items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83958 0.833313C8.71133 0.83423 9.54183 1.2504 10.0625 1.94615L10.8976 3.05715C11.1625 3.40915 11.5832 3.61906 12.0232 3.61998H14.6165C18.1567 3.61998 19.8057 5.43406 19.8057 9.32898L19.7801 13.8821C19.7792 17.5194 17.5187 19.7799 13.8795 19.7799H6.746C3.0995 19.7799 0.833496 17.5185 0.833496 13.8793V6.73023C0.833496 2.81698 2.57425 0.833313 6.00625 0.833313H7.83958ZM7.83866 2.20831H6.00625C3.34425 2.20831 2.2085 3.56131 2.2085 6.73023V13.8793C2.2085 16.798 3.82 18.4049 6.746 18.4049H13.8795C16.7982 18.4049 18.4051 16.798 18.4051 13.8793V13.8766L18.4307 9.32531C18.4307 6.20956 17.3619 4.99498 14.6165 4.99498H12.0223C11.1524 4.99406 10.3219 4.57881 9.79941 3.88398L8.9625 2.77115C8.69941 2.41823 8.27866 2.20923 7.83866 2.20831ZM14.3233 12.0284C14.7028 12.0284 15.0108 12.3364 15.0108 12.7159C15.0108 13.0954 14.7028 13.4034 14.3233 13.4034H6.31626C5.93676 13.4034 5.62876 13.0954 5.62876 12.7159C5.62876 12.3364 5.93676 12.0284 6.31626 12.0284H14.3233Z" fill="#56555C" />
                    </svg>

                    <strong className="text-muted" style={{ fontWeight: '500', fontSize: '15px' }}>Pocket Money</strong>
                </div>

                <div className="d-flex align-items-center gap-3">
                    {/* Balance Label */}
                    <div className="d-flex flex-column align-items-end ">
                        <div className="d-flex align-items-center gap-3 mb-1 ">
                            <span style={{ color: "#6B6B6B", fontWeight: 500, marginRight: '17px', fontSize: '12px' }}>Balance</span>
                            <span style={{ color: "#E53935", fontWeight: 500, fontSize: "0.8rem" }}>
                                800
                            </span>
                        </div>

                        {/* Custom Progress */}
                        <div style={{ display: "flex", width: "97px", height: "5px", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ flex: 2, backgroundColor: "#E53935" }}></div>
                            <div style={{ flex: 3, backgroundColor: "#D9D9D9" }}></div>
                        </div>
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

            {/* Content */}
            {isOpen && (
                <div className="mt-4 px-2">
                    <div className="row gy-3 border-top">
                        <div className="col-md-6">
                            <PocketItem label="Pocket Refund" value={data.pocketRefund || 'N/A'} />
                            <PocketItem label="Deposited Amount" value={data.depositedAmount || 'N/A'} />
                            <PocketItem label="Taken Amount" value={data.takenAmount || 'N/A'} />
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <div className="top"
                                style={{
                                    width: "180px",
                                    height: "260px",
                                    borderRadius: "24px",
                                    background: "linear-gradient(145deg,rgb(103, 48, 161),rgb(150, 67, 199))",
                                    padding: "20px",
                                    color: "white",
                                    position: "relative",
                                }}
                            >
                                <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Admission No</div>
                                <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                                    123456765432
                                </div>

                                <div className="mt-3">
                                    <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Yaswanth Bhimineni</div>
                                    <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>Student Name</div>
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "65px",
                                        right: "20px",
                                        textAlign: "right",
                                    }}
                                >
                                    <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Balance</div>
                                    <div style={{ fontSize: "1.3rem", fontWeight: "700" }}>2,000</div>
                                </div>
                                <div >
                                    <div className="bottom-content"
                                        style={{
                                            position: "absolute",
                                            bottom: "0px",
                                            left: "0px",
                                            width: "100%",
                                            backgroundColor: "black", // semi-transparent white
                                            borderBottomLeftRadius: "24px",
                                            borderBottomRightRadius: "24px",
                                            padding: "10px 12px",
                                            display: "flex",
                                            gap: "10px",
                                        }}
                                    >
                                        <figure>
                                            <img
                                                src={ScLogo}
                                                alt="logo"
                                                width="24"
                                                height="24"
                                            />
                                            <img
                                                src={ModrenLogo}
                                                alt="logo"
                                                width="24"
                                                height="24"
                                            />
                                        </figure>
                                    </div>
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable Pocket Info item
const PocketItem = ({ label, value }) => (
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
                backgroundColor: "#F3F3F3",
                textAlign: "center",
            }}
        >
            {value}
        </span>
    </div>
);


export default PocketMoney;


// // import { BsChevronDown, BsChevronUp } from "react-icons/bs";
// import ScLogo from '../../assets/scLogo.png';
// import ModrenLogo from '../../assets/modernLogo.png';
// import { useStudentMajorInfo } from '../../backend/queries';

// const PocketMoney = ({ isOpen, onToggle }) => {
//     // const{data, isLoading, isError, error} = useStudentMajorInfo();
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
//         <div className="bg-white mb-2 p-3 rounded shadow-sm" style={{}}>
//             {/* Header */}
//             <div
//                 className="d-flex justify-content-between align-items-center pb-2"
//                 onClick={onToggle}
//                 style={{ cursor: "pointer", height: "18px" }}
//             >
//                 <div className="d-flex align-items-center gap-2">
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83958 0.833313C8.71133 0.83423 9.54183 1.2504 10.0625 1.94615L10.8976 3.05715C11.1625 3.40915 11.5832 3.61906 12.0232 3.61998H14.6165C18.1567 3.61998 19.8057 5.43406 19.8057 9.32898L19.7801 13.8821C19.7792 17.5194 17.5187 19.7799 13.8795 19.7799H6.746C3.0995 19.7799 0.833496 17.5185 0.833496 13.8793V6.73023C0.833496 2.81698 2.57425 0.833313 6.00625 0.833313H7.83958ZM7.83866 2.20831H6.00625C3.34425 2.20831 2.2085 3.56131 2.2085 6.73023V13.8793C2.2085 16.798 3.82 18.4049 6.746 18.4049H13.8795C16.7982 18.4049 18.4051 16.798 18.4051 13.8793V13.8766L18.4307 9.32531C18.4307 6.20956 17.3619 4.99498 14.6165 4.99498H12.0223C11.1524 4.99406 10.3219 4.57881 9.79941 3.88398L8.9625 2.77115C8.69941 2.41823 8.27866 2.20923 7.83866 2.20831ZM14.3233 12.0284C14.7028 12.0284 15.0108 12.3364 15.0108 12.7159C15.0108 13.0954 14.7028 13.4034 14.3233 13.4034H6.31626C5.93676 13.4034 5.62876 13.0954 5.62876 12.7159C5.62876 12.3364 5.93676 12.0284 6.31626 12.0284H14.3233Z" fill="#56555C" />
//                     </svg>

//                     <strong className="text-muted" style={{ fontWeight: '500', fontSize: '15px' }}>Pocket Money</strong>
//                 </div>

//                 <div className="d-flex align-items-center gap-3">
//                     {/* Balance Label */}
//                     <div className="d-flex flex-column align-items-end ">
//                         <div className="d-flex align-items-center gap-3 mb-1 ">
//                             <span style={{ color: "#6B6B6B", fontWeight: 500, marginRight: '17px', fontSize: '12px' }}>Balance</span>
//                             <span style={{ color: "#E53935", fontWeight: 500, fontSize: "0.8rem" }}>
//                                 800
//                             </span>
//                         </div>

//                         {/* Custom Progress */}
//                         <div style={{ display: "flex", width: "97px", height: "5px", borderRadius: "4px", overflow: "hidden" }}>
//                             <div style={{ flex: 2, backgroundColor: "#E53935" }}></div>
//                             <div style={{ flex: 3, backgroundColor: "#D9D9D9" }}></div>
//                         </div>
//                     </div>

//                     {isOpen ? (
//                         // Up Arrow SVG
//                         <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M1 6L6 1L11 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     ) : (
//                         // Down Arrow SVG
//                         <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     )}
//                 </div>
//             </div>

//             {/* Content */}
//             {isOpen && (
//                 <div className="mt-4 px-2">
//                     <div className="row gy-3 border-top">
//                         <div className="col-md-6">
//                             <PocketItem label="Pocket Refund" value={'N/A'} />
//                             <PocketItem label="Deposited Amount" value={'N/A'} />
//                             <PocketItem label="Taken Amount" value={'N/A'} />
//                         </div>

//                         <div className="col-md-6 d-flex justify-content-end">
//                             <div className="top"
//                                 style={{
//                                     width: "180px",
//                                     height: "260px",
//                                     borderRadius: "24px",
//                                     background: "linear-gradient(145deg,rgb(103, 48, 161),rgb(150, 67, 199))",
//                                     padding: "20px",
//                                     color: "white",
//                                     position: "relative",
//                                 }}
//                             >
//                                 <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Admission No</div>
//                                 <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
//                                     123456765432
//                                 </div>

//                                 <div className="mt-3">
//                                     <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Yaswanth Bhimineni</div>
//                                     <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>Student Name</div>
//                                 </div>

//                                 <div
//                                     style={{
//                                         position: "absolute",
//                                         bottom: "65px",
//                                         right: "20px",
//                                         textAlign: "right",
//                                     }}
//                                 >
//                                     <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Balance</div>
//                                     <div style={{ fontSize: "1.3rem", fontWeight: "700" }}>2,000</div>
//                                 </div>
//                                 <div >
//                                     <div className="bottom-content"
//                                         style={{
//                                             position: "absolute",
//                                             bottom: "0px",
//                                             left: "0px",
//                                             width: "100%",
//                                             backgroundColor: "black", // semi-transparent white
//                                             borderBottomLeftRadius: "24px",
//                                             borderBottomRightRadius: "24px",
//                                             padding: "10px 12px",
//                                             display: "flex",
//                                             gap: "10px",
//                                         }}
//                                     >
//                                         <figure>
//                                             <img
//                                                 src={ScLogo}
//                                                 alt="logo"
//                                                 width="24"
//                                                 height="24"
//                                             />
//                                             <img
//                                                 src={ModrenLogo}
//                                                 alt="logo"
//                                                 width="24"
//                                                 height="24"
//                                             />
//                                         </figure>
//                                     </div>
//                                 </div>



//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Reusable Pocket Info item
// const PocketItem = ({ label, value }) => (
//     <div className="d-flex justify-content-between align-items-center mb-2">
//         {/* Label */}
//         <span
//             style={{
//                 color: "#82808F",
//                 fontSize: "14px",
//                 fontWeight: 400,

//                 lineHeight: "normal",
//             }}
//         >
//             {label}
//         </span>

//         {/* Value */}
//         <span
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


// export default PocketMoney;