// import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { useStudentMajorInfo } from "../../backend/queries";

const Refunds = ({ isOpen, onToggle }) => {
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
        <div className="bg-white mb-2 p-3 rounded shadow-sm" >
            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center"
                onClick={onToggle}
                style={{ cursor: "pointer" }}
            >
                <div className="d-flex align-items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83909 0.833313C8.71084 0.83423 9.54134 1.2504 10.062 1.94615L10.8971 3.05715C11.162 3.40915 11.5828 3.61906 12.0228 3.61998H14.616C18.1562 3.61998 19.8053 5.43406 19.8053 9.32898L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73023C0.833008 2.81698 2.57376 0.833313 6.00576 0.833313H7.83909ZM7.83817 2.20831H6.00576C3.34376 2.20831 2.20801 3.56131 2.20801 6.73023V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32531C18.4303 6.20956 17.3614 4.99498 14.616 4.99498H12.0218C11.1519 4.99406 10.3214 4.57881 9.79892 3.88398L8.96201 2.77115C8.69892 2.41823 8.27817 2.20923 7.83817 2.20831ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z" fill="#56555C" />
                    </svg>

                    <strong className="text-muted" style={{ fontWeight: '500', fontSize: '15px' }}>Refunds</strong>
                </div>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center " style={{ gap: "45px", marginRight: "15px" , fontSize:'12px'}}>
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
                <div className="mt-4 px-2">
                    <RefundItem label="Akash Books" value={data.akash_books || 'N/A'} />
                    <RefundItem label="Bus Pass" value={data.bus_pss || 'N/A'} />
                    <RefundItem label="Caution Deposit" value={data.caution_deposite || 'N/A'} />
                    <RefundItem label="Material" value={data.material || 'N/A'} />
                </div>
            )}
        </div>
    );
};

// Reusable aligned row
const RefundItem = ({ label, value }) => (
    <div
        className="d-flex align-items-center justify-content-start mb-2"
        style={{ gap: "20px" }} // Adjust this for spacing between label and value
    >
        {/* Label */}
        <span className="text-muted" style={{ minWidth: "140px", fontWeight: '500', color: '#82808F', fontSize: '12px' }}>{label}</span>

        {/* Value Box */}
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

export default Refunds;