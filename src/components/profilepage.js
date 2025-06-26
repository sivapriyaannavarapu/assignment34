import { Routes, Route, Outlet } from "react-router-dom";
import Information from "./student-profile-module/Information";
// import Payments from "./Payments/Payments";
import Studentprofile from "./student-profile-info";
import "../styles/profilepage.css";
import StudentInformation from "./student-profile-module/student-profile-main";
import PaymentInformation from "./payment-module/payments-information";
import Payments from "./payment-module/payments";
import PaymentTabs from "./payment-module/paymentssubtab";
// import PaymentInformation from "./Payments/payment-information";

const Screen = () => {
  return (
    <main className="w-100">
      <div className="top">
        <Studentprofile />
      </div>

      <div className="student_screen p-0 gap-3">
        <Routes>
          {/* <Route index element={<></>} /> This matches /student */}
          <Route path="/" element={
            <>
              <StudentInformation />
              <Information />
            </>
          } />

          <Route path="payments" element={
            <>
            <PaymentTabs/>
            <PaymentInformation/>
            </>}>
          
            <Route path="/payments" element={<Payments />} />
            <Route path="cancellation" element={<div>Cancellation</div>} />
          </Route>
        
          



          {/* Add other routes similarly */}
        </Routes>
      </div>
    </main>
  );
};

export default Screen;