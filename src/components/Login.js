import "../styles/login.css"
import scimage from "../assets/sc-image.png"
import LoginRightSec from "./login-form";

function Login() {
    return (
        <>
            <main>
                <div className="container-fluid px-0">

                    <div className="back-grnd-container w-100 bg-cover p-0" >

                        <div className="bg-image-overlay w-100 h-100 ">

                            <div className="row m-0 p-0">

                                <div className="left-section col-lg-6 col-md-6 position-relative px-0" style={{ height: "100vh", width:"50%"}}>
                                    {/* Left Section */}

                                    <div style={{ width: "30vw",transform: "translateY(-50%)"}} className="d-flex flex-column gap-4 position-absolute   top-50 end-0"  >

                                        <div className="d-flex align-items-center " >
                                            <img src={scimage} alt="Logo" className="logo-img" />
                                            <div className="text-left">
                                                <h3 className="mb-0 fw-400 text-light "style={{fontFamily:"fantasy"}}>Sri Chaitanya</h3>
                                                <p className="mb-0 small text-light">Educational Institutions</p>
                                            </div>
                                        </div>

                                        <div >
                                            <h1 className=" fw-bold text-light fs-1">Building the Future...</h1>
                                            <p className="mt-3 mb-0 text-light build-sub-text ">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3 ">
                                            <span className="text-light dash dash-lg"></span>
                                            <span className="dash dash-md"></span>
                                            <span className="dash dash-md"></span>
                                        </div>

                                    </div>
                                </div>


                                <div className="right-section col-lg-6 col-md-6  my-0 pl-1">
                                    <LoginRightSec/>
                                </div>

                            </div>




                        </div>

                    </div>

                </div>

            </main >

        </>
    );
}

export default Login;