import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FeeDetails from "./feedetails";
import PocketMoney from "./pocketmoney";
import TransportDetails from "./transportdetails";
import Refunds from "./refunds";
import OtherFeeHeads from "./otherfeeheads";
import "../../styles/student-profile-main.css";

const StudentInformation = () => {

    const [activeClass, setActiveClass] = useState("Class 8");
    const [openSection, setOpenSection] = useState(null);

    const topClasses = ["Class 9", "Class 8", "Class 7"];
    const moreClasses = [
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 10",
        "Inter 1",
        "Inter 2",
    ];
    const isInTop = topClasses.includes(activeClass);

    const handleToggle = (sectionName) => {
        setOpenSection(prev => (prev === sectionName ? null : sectionName));
    };

    return (
        <div className="container-fluid px-0">
            

            <div className="d-flex" >
                

                <main className="flex-grow-1">
                   
                    <section className="section_bottom">
                        <div className="parent" style={{ width: '100%', backgroundColor: '#F6F8F9' }} >
                            <div className="child_1 " style={{ width: '100%', height: '67vh', backgroundColor: '' }}>
                                <div className="top-main" style={{ height: '15%', }}>
                                    <div className="d-flex justify-content-between align-items-center pt-4" style={{marginLeft:'5px',    backgroundColor: '#F6F8F9', width:'100%' }}>
                                        {/* Left section */}
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-3 p-2 d-flex justify-content-center align-items-center"
                                                style={{ width: 40, height: 40, backgroundColor: '#3425FF' }}
                                            >
                                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M10.0183 5.7593H15.9086M6.09151 5.7593H7.07322M6.09151 10.6678H7.07322M6.09151 15.5764H7.07322M10.0183 10.6678H15.9086M10.0183 15.5764H15.9086M1.67383 10.6678C1.67383 6.27175 1.67383 4.07272 3.03938 2.70717C4.40494 1.34161 6.60298 1.34161 11 1.34161C15.3961 1.34161 17.5952 1.34161 18.9607 2.70717C20.3263 4.07272 20.3263 6.27077 20.3263 10.6678C20.3263 15.0639 20.3263 17.2629 18.9607 18.6285C17.5952 19.9941 15.3971 19.9941 11 19.9941C6.60396 19.9941 4.40494 19.9941 3.03938 18.6285C1.67383 17.2629 1.67383 15.0649 1.67383 10.6678Z"
                                                        stroke="white"
                                                        strokeWidth="1.47256"
                                                        strokeLineca    p="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="ms-2"> {/* changed from ms-3 to ms-2 */}
                                                <h5 className="mb-0 fw-bold">Student Information</h5>
                                                <small className="text-muted" style={{fontFamily: 'Inter, sans-serif', fontSize:'12px'}}>
                                                    Get All Student Details Regarding Fee Payment, And More...
                                                </small>
                                            </div>
                                        </div>

                                        {/* Right section */}
                                        <div
                                            className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill"
                                            style={{ backgroundColor: "#F0F0F0" }}
                                        >
                                            {topClasses.map((cls) => (
                                                <button
                                                    key={cls}
                                                    onClick={() => setActiveClass(cls)}
                                                    className="btn border-0 px-0"
                                                    style={{
                                                        width: "80px",
                                                        height: "32px",
                                                        borderRadius: "9999px",
                                                        backgroundColor: activeClass === cls ? "#3425FF" : "#F0F0F0",
                                                        color: activeClass === cls ? "#fff" : "#000",
                                                        fontSize: "0.85rem",
                                                        lineHeight: "16px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {cls}
                                                </button>


                                            ))}

                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="light"
                                                    className="rounded-pill px-2 py-0 border-0 custom-toggle"
                                                    style={{
                                                        backgroundColor: isInTop ? "#F0F0F0" : "#3425FF",
                                                        color: isInTop ? "#000" : "#fff",
                                                        fontSize: "0.85rem",
                                                        height: "32px",
                                                        width: "80px",
                                                        lineHeight: "16px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        gap: "4px", // reduced gap between text and SVG
                                                    }}
                                                >
                                                    <span>{isInTop ? "More" : activeClass}</span>
                                                    <svg
                                                        width="8"
                                                        height="5"
                                                        viewBox="0 0 8 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.00019 1.13076L4.1583 3.97266L1.31641 1.13076"
                                                            stroke="#616161"
                                                            strokeWidth="1.13676"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {moreClasses.map((cls) => (
                                                        <Dropdown.Item
                                                            key={cls}
                                                            onClick={() => setActiveClass(cls)}
                                                            active={activeClass === cls}
                                                        >
                                                            {cls}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>




                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bottom-main d-flex justify-content-start align-items-start "
                                    style={{
                                        height: '85%',
                                        overflowY: 'auto',
                                        // paddingRight: '0.5rem',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                    }}
                                >
                                    <div
                                        className="mt-2"
                                        style={{
                                            width: '100%',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <FeeDetails isOpen={openSection === "fee"} onToggle={() => handleToggle("fee")} />
                                        <PocketMoney isOpen={openSection === "pocket"} onToggle={() => handleToggle("pocket")} />

                                        <TransportDetails isOpen={openSection === "transport"} onToggle={() => handleToggle("transport")} />
                                        <Refunds isOpen={openSection === "refunds"} onToggle={() => handleToggle("refunds")} />
                                        <OtherFeeHeads isOpen={openSection === "others"} onToggle={() => handleToggle("others")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    );
}

export default StudentInformation;