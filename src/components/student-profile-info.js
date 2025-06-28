import studentImg from "../assets/Student.jpg";
import Button from "@mui/material/Button";
import heroBackground from "../assets/Hero-block.png";
import { NavLink } from "react-router-dom";
import { useStudentProfile } from "../backend/queries";
import "../styles/student-profile-info.css";
import {useStudentContext} from "./customHooks/StudentContext"
import male from "../assets/male.jpg";
import female from "../assets/female.jpg";
const Studentprofile = () => {

    const {studentId} = useStudentContext();
    const { data, isLoading, isError, error } = useStudentProfile();
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

    const studentimg = data.gender === 'Male' ? male : data.gender === 'Female' ? female : studentImg;

    return (
        <div
            className="container-fluid student-profile"
            style={{
                backgroundImage: `url(${heroBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                fontFamily: 'Inter, sans-serif'
            }}
        >


            <div className="row">
                <div style={{ height: "25vh" }} className="d-flex  flex-column justify-content-between border-bottom border-start">
                    <div className="student_profile col-lg-12 d-flex align-items-center justify-content-between position-relative pb-0 pt-2">

                        {/* Left: Image + Name */}
                        <div className="d-flex align-items-center">
                            <div className="profile-image me-3">
                                <img
                                    src={studentimg}
                                    alt="Student"
                                    className="shadowed-profile-img rounded-circle"
                                />
                            </div>
                            <div className="profile-details">
                                <p className="admin-no mb-1">
                                    <span className="custom-text-color" style={{ color: "#6E7C87", fontSize: "14px", fontWeight: "500" }}>Admin No:</span>
                                    <span className="text-dark " style={{ fontSize: "14px", fontWeight: "600" }}> HYD {studentId || 'N/A'} </span>
                                </p>
                                <h2 className="fw-bold mb-2">{data.studentName || 'N/A'}</h2>
                                <div className="d-flex align-items-center small text-secondary gap-2 pb-2">
                                    <div className="d-flex align-items-center text-secondary small gap-2">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0V4.5H10.5V2.56875L7.51875 5.53125C7.75625 5.88125 7.9375 6.25325 8.0625 6.64725C8.1875 7.04125 8.25 7.4505 8.25 7.875C8.25 9.025 7.85 10 7.05 10.8C6.25 11.6 5.275 12 4.125 12C2.975 12 2 11.6 1.2 10.8C0.4 10 0 9.025 0 7.875C0 6.725 0.4 5.75 1.2 4.95C2 4.15 2.975 3.75 4.125 3.75C4.5375 3.75 4.94375 3.80925 5.34375 3.92775C5.74375 4.04625 6.1125 4.23075 6.45 4.48125L9.43125 1.5H7.5V0H12ZM4.125 5.25C3.4 5.25 2.78125 5.50625 2.26875 6.01875C1.75625 6.53125 1.5 7.15 1.5 7.875C1.5 8.6 1.75625 9.21875 2.26875 9.73125C2.78125 10.2438 3.4 10.5 4.125 10.5C4.85 10.5 5.46875 10.2438 5.98125 9.73125C6.49375 9.21875 6.75 8.6 6.75 7.875C6.75 7.15 6.49375 6.53125 5.98125 6.01875C5.46875 5.50625 4.85 5.25 4.125 5.25Z" fill="#5558FF" />
                                        </svg>

                                        {/* <span className="text-primary fw-bold " >&#9794;</span> */}
                                        <span style={{ fontWeight: "600", fontSize: "12px", color: "#010101" }}> {data.gender || 'N/A'}</span>
                                        <span style={{ color: "#D9D9D9" }}>&bull;</span>
                                        <span style={{ fontWeight: "600", fontSize: "12px", color: "#010101" }}>General</span>

                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                                    <span className="badge classButton px-3 py-2">Class 8</span>
                                    <span className="badge TechnoButton px-3 py-2">Techno</span>
                                    {/* <button className="btn btn-light rounded shadow-sm px-3 py-1">
                                        &#8942;
                                    </button> */}
                                    <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V19C28 21.2091 26.2091 23 24 23H4C1.79086 23 0 21.2091 0 19V4Z" fill="white" />
                                        <path d="M4 0.5H24C25.933 0.5 27.5 2.067 27.5 4V19C27.5 20.933 25.933 22.5 24 22.5H4C2.067 22.5 0.5 20.933 0.5 19V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="black" stroke-opacity="0.05" />
                                        <path d="M9.75 12C9.75 12.9665 8.9665 13.75 8 13.75C7.0335 13.75 6.25 12.9665 6.25 12C6.25 11.0335 7.0335 10.25 8 10.25C8.9665 10.25 9.75 11.0335 9.75 12ZM15.75 12C15.75 12.9665 14.9665 13.75 14 13.75C13.0335 13.75 12.25 12.9665 12.25 12C12.25 11.0335 13.0335 10.25 14 10.25C14.9665 10.25 15.75 11.0335 15.75 12ZM20 13.75C20.9665 13.75 21.75 12.9665 21.75 12C21.75 11.0335 20.9665 10.25 20 10.25C19.0335 10.25 18.25 11.0335 18.25 12C18.25 12.9665 19.0335 13.75 20 13.75Z" fill="#616161" />
                                    </svg>
                                </div>
                            </div>

                            <div className="row px-5">
                                <div className="col-md-4 mb-3 ">
                                    <p className="mb-0 Names small">Course Track / Orientation</p>
                                    <p className=" Names1  mb-0">{data.course_track || 'N/A'}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <p className="mb-0 Names small">Admission Type</p>
                                    <p className=" Names1  mb-0">{data.admission_type || 'N/A'}</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    {/* <p className="mb-0 text-muted small">Admission Type</p>
                                <p className="fw-semibold mb-0">Direct Walkin</p> */}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <p className="mb-0 Names small">Admission Status</p>
                                    <p className="Names1 mb-0">{data.admission_status || 'N/A'}</p>
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <p className="mb-0 Names small">Student Type</p>
                                    <p className="Names1 mb-0">{data.student_type || 'N/A'}</p>
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <p className="mb-0 Names small">Section</p>
                                    <p className="Names1 mb-0">{data.section || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4994 2C10.2342 2 9.97986 1.89464 9.79232 1.70711C9.60479 1.51957 9.49943 1.26522 9.49943 1C9.49943 0.734784 9.60479 0.48043 9.79232 0.292893C9.97986 0.105357 10.2342 0 10.4994 0H15.4994C15.7646 0 16.019 0.105357 16.2065 0.292893C16.3941 0.48043 16.4994 0.734784 16.4994 1V6C16.4994 6.26522 16.3941 6.51957 16.2065 6.70711C16.019 6.89464 15.7646 7 15.4994 7C15.2342 7 14.9799 6.89464 14.7923 6.70711C14.6048 6.51957 14.4994 6.26522 14.4994 6V3.414L10.2064 7.707C10.0189 7.89447 9.7646 7.99979 9.49943 7.99979C9.23427 7.99979 8.97996 7.89447 8.79243 7.707L6.49943 5.414L2.20643 9.707C2.01783 9.88916 1.76523 9.98995 1.50303 9.98767C1.24083 9.9854 0.99002 9.88023 0.804612 9.69482C0.619204 9.50941 0.514035 9.2586 0.511757 8.9964C0.509478 8.7342 0.610272 8.4816 0.792431 8.293L5.79243 3.293C5.97996 3.10553 6.23427 3.00021 6.49943 3.00021C6.7646 3.00021 7.0189 3.10553 7.20643 3.293L9.49943 5.586L13.0854 2H10.4994Z" fill="white" />
                            </svg>
                            }

                            sx={{
                                position: "absolute",         // key line!
                                top: "10px",
                                right: "10px",
                                height: "40px",
                                width: "160px",
                                backgroundColor: "#3425FF",
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: "600",
                                flexDirection: "row",
                                whiteSpace: "nowrap",
                                borderRadius: "5px",
                                textTransform: "none", // optional: prevents uppercase
                                "&:hover": {
                                    backgroundColor: "#2b20d1",
                                },
                            }}
                        >
                            View full Profile
                        </Button>

                    </div>
                    <div className="col-12  ">
                        <nav>
                            <div className="d-flex gap-4 px-0 flex-wrap nav-links-wrapper">
                                <NavLink
                                    to="/student"
                                    end
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Student Profile
                                </NavLink>
                                <NavLink
                                    to="/student/payments"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Payments
                                </NavLink>
                                <NavLink
                                    to="/transport"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Transport
                                </NavLink>
                                <NavLink
                                    to="/academics"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Academics
                                </NavLink>
                                <NavLink
                                    to="/alerts"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Alerts
                                </NavLink>
                                <NavLink
                                    to="/history"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    History
                                </NavLink>
                                <NavLink
                                    to="/room-allotment"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Room Allotment
                                </NavLink>
                                <NavLink
                                    to="/issue-forms"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Issue Forms
                                </NavLink>
                                <NavLink
                                    to="/certificates"
                                    className={({ isActive }) =>
                                        `custom-tab-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Certificates
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studentprofile;





// import studentImg from "../assets/Student.jpg";
// import Button from "@mui/material/Button";
// import heroBackground from "../assets/Hero-block.png";
// import { NavLink } from "react-router-dom";
// import { useStudentProfile } from "../backend/queries";
// import "../styles/student-profile-info.css";
// import {useStudentContext} from "./customHooks/StudentContext"

// const Studentprofile = () => {

//     const {studentId} = useStudentContext();
//     // const { data, isLoading, isError, error } = useStudentProfile();
//     // console.log(data);

//     // if (isLoading) {
//     //     return <div className="container-fluid px-0 mt-4">Loading...</div>;
//     // }

//     // // Handle error state
//     // if (isError) {
//     //     return (
//     //         <div className="container-fluid px-0 mt-4">
//     //             Error: {error?.message || "Failed to load student profile"}
//     //         </div>
//     //     );
//     // }

//     // //   Handle no data
//     // if (!data) {
//     //     return (
//     //         <div className="container-fluid px-0 mt-4">
//     //             No student profile data available.
//     //         </div>
//     //     );
//     // }
//     return (
//         <div
//             className="container-fluid student-profile"
//             style={{
//                 backgroundImage: `url(${heroBackground})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 fontFamily: 'Inter, sans-serif'
//             }}
//         >


//             <div className="row">
//                 <div style={{ height: "25vh" }} className="d-flex  flex-column justify-content-between border-bottom border-start">
//                     <div className="student_profile col-lg-12 d-flex align-items-center justify-content-between position-relative pb-0 pt-2">

//                         {/* Left: Image + Name */}
//                         <div className="d-flex align-items-center">
//                             <div className="profile-image me-3">
//                                 <img
//                                     src={studentImg}
//                                     alt="Student"
//                                     className="shadowed-profile-img rounded-circle"
//                                 />
//                             </div>
//                             <div className="profile-details">
//                                 <p className="admin-no mb-1">
//                                     <span className="custom-text-color" style={{ color: "#6E7C87", fontSize: "14px", fontWeight: "500" }}>Admin No:</span>
//                                     <span className="text-dark " style={{ fontSize: "14px", fontWeight: "600"}}> HYD {'N/A'} </span>
//                                 </p>
//                                 <h2 className="fw-bold mb-2">{'N/A'}</h2>
//                                 <div className="d-flex align-items-center small text-secondary gap-2 pb-2">
//                                     <div className="d-flex align-items-center text-secondary small gap-2">
//                                         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M12 0V4.5H10.5V2.56875L7.51875 5.53125C7.75625 5.88125 7.9375 6.25325 8.0625 6.64725C8.1875 7.04125 8.25 7.4505 8.25 7.875C8.25 9.025 7.85 10 7.05 10.8C6.25 11.6 5.275 12 4.125 12C2.975 12 2 11.6 1.2 10.8C0.4 10 0 9.025 0 7.875C0 6.725 0.4 5.75 1.2 4.95C2 4.15 2.975 3.75 4.125 3.75C4.5375 3.75 4.94375 3.80925 5.34375 3.92775C5.74375 4.04625 6.1125 4.23075 6.45 4.48125L9.43125 1.5H7.5V0H12ZM4.125 5.25C3.4 5.25 2.78125 5.50625 2.26875 6.01875C1.75625 6.53125 1.5 7.15 1.5 7.875C1.5 8.6 1.75625 9.21875 2.26875 9.73125C2.78125 10.2438 3.4 10.5 4.125 10.5C4.85 10.5 5.46875 10.2438 5.98125 9.73125C6.49375 9.21875 6.75 8.6 6.75 7.875C6.75 7.15 6.49375 6.53125 5.98125 6.01875C5.46875 5.50625 4.85 5.25 4.125 5.25Z" fill="#5558FF" />
//                                         </svg>

//                                         {/* <span className="text-primary fw-bold " >&#9794;</span> */}
//                                         <span style={{ fontWeight: "600", fontSize: "12px", color: "#010101" }}>{'N/A'}</span>
//                                         <span style={{ color: "#D9D9D9" }}>&bull;</span>
//                                         <span style={{ fontWeight: "600", fontSize: "12px", color: "#010101" }}>General</span>

//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
//                                     <span className="badge classButton px-3 py-2">Class 8</span>
//                                     <span className="badge TechnoButton px-3 py-2">Techno</span>
//                                     {/* <button className="btn btn-light rounded shadow-sm px-3 py-1">
//                                         &#8942;
//                                     </button> */}
//                                     <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V19C28 21.2091 26.2091 23 24 23H4C1.79086 23 0 21.2091 0 19V4Z" fill="white" />
//                                         <path d="M4 0.5H24C25.933 0.5 27.5 2.067 27.5 4V19C27.5 20.933 25.933 22.5 24 22.5H4C2.067 22.5 0.5 20.933 0.5 19V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="black" stroke-opacity="0.05" />
//                                         <path d="M9.75 12C9.75 12.9665 8.9665 13.75 8 13.75C7.0335 13.75 6.25 12.9665 6.25 12C6.25 11.0335 7.0335 10.25 8 10.25C8.9665 10.25 9.75 11.0335 9.75 12ZM15.75 12C15.75 12.9665 14.9665 13.75 14 13.75C13.0335 13.75 12.25 12.9665 12.25 12C12.25 11.0335 13.0335 10.25 14 10.25C14.9665 10.25 15.75 11.0335 15.75 12ZM20 13.75C20.9665 13.75 21.75 12.9665 21.75 12C21.75 11.0335 20.9665 10.25 20 10.25C19.0335 10.25 18.25 11.0335 18.25 12C18.25 12.9665 19.0335 13.75 20 13.75Z" fill="#616161" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             <div className="row px-5">
//                                 <div className="col-md-4 mb-3 ">
//                                     <p className="mb-0 Names small">Course Track / Orientation</p>
//                                     <p className=" Names1  mb-0">{'N/A'}</p>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <p className="mb-0 Names small">Admission Type</p>
//                                     <p className=" Names1  mb-0">{'N/A'}</p>
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     {/* <p className="mb-0 text-muted small">Admission Type</p>
//                                 <p className="fw-semibold mb-0">Direct Walkin</p> */}
//                                 </div>
//                                 <div className="col-md-4 mb-3">
//                                     <p className="mb-0 Names small">Admission Status</p>
//                                     <p className="Names1 mb-0">{'N/A'}</p>
//                                 </div>
//                                 <div className="col-md-4 mb-3 ">
//                                     <p className="mb-0 Names small">Student Type</p>
//                                     <p className="Names1 mb-0">{'N/A'}</p>
//                                 </div>
//                                 <div className="col-md-4 mb-3 ">
//                                     <p className="mb-0 Names small">Section</p>
//                                     <p className="Names1 mb-0">{'N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <Button
//                             variant="contained"
//                             startIcon={<svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4994 2C10.2342 2 9.97986 1.89464 9.79232 1.70711C9.60479 1.51957 9.49943 1.26522 9.49943 1C9.49943 0.734784 9.60479 0.48043 9.79232 0.292893C9.97986 0.105357 10.2342 0 10.4994 0H15.4994C15.7646 0 16.019 0.105357 16.2065 0.292893C16.3941 0.48043 16.4994 0.734784 16.4994 1V6C16.4994 6.26522 16.3941 6.51957 16.2065 6.70711C16.019 6.89464 15.7646 7 15.4994 7C15.2342 7 14.9799 6.89464 14.7923 6.70711C14.6048 6.51957 14.4994 6.26522 14.4994 6V3.414L10.2064 7.707C10.0189 7.89447 9.7646 7.99979 9.49943 7.99979C9.23427 7.99979 8.97996 7.89447 8.79243 7.707L6.49943 5.414L2.20643 9.707C2.01783 9.88916 1.76523 9.98995 1.50303 9.98767C1.24083 9.9854 0.99002 9.88023 0.804612 9.69482C0.619204 9.50941 0.514035 9.2586 0.511757 8.9964C0.509478 8.7342 0.610272 8.4816 0.792431 8.293L5.79243 3.293C5.97996 3.10553 6.23427 3.00021 6.49943 3.00021C6.7646 3.00021 7.0189 3.10553 7.20643 3.293L9.49943 5.586L13.0854 2H10.4994Z" fill="white" />
//                             </svg>
//                             }

//                             sx={{
//                                 position: "absolute",         // key line!
//                                 top: "10px",
//                                 right: "10px",
//                                 height: "40px",
//                                 width: "160px",
//                                 backgroundColor: "#3425FF",
//                                 color: "#ffffff",
//                                 fontSize: "14px",
//                                 fontWeight: "600",
//                                 flexDirection: "row",
//                                 whiteSpace: "nowrap",
//                                 borderRadius: "5px",
//                                 textTransform: "none", // optional: prevents uppercase
//                                 "&:hover": {
//                                     backgroundColor: "#2b20d1",
//                                 },
//                             }}
//                         >
//                             View full Profile
//                         </Button>

//                     </div>
//                     <div className="col-12  ">
//                         <nav>
//                             <div className="d-flex gap-4 px-0 flex-wrap nav-links-wrapper">
//                                 <NavLink
//                                     to="/student"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Student Profile
//                                 </NavLink>
//                                 <NavLink
//                                     to="/student/payments"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Payments
//                                 </NavLink>
//                                 <NavLink
//                                     to="/transport"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Transport
//                                 </NavLink>
//                                 <NavLink
//                                     to="/academics"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Academics
//                                 </NavLink>
//                                 <NavLink
//                                     to="/alerts"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Alerts
//                                 </NavLink>
//                                 <NavLink
//                                     to="/history"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     History
//                                 </NavLink>
//                                 <NavLink
//                                     to="/room-allotment"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Room Allotment
//                                 </NavLink>
//                                 <NavLink
//                                     to="/issue-forms"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Issue Forms
//                                 </NavLink>
//                                 <NavLink
//                                     to="/certificates"
//                                     className={({ isActive }) =>
//                                         `custom-tab-link ${isActive ? 'active' : ''}`
//                                     }
//                                 >
//                                     Certificates
//                                 </NavLink>
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Studentprofile;