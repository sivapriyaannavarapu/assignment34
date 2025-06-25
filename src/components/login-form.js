import "../styles/login-form.css";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginRightSec() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            employeeId: "",
            password: ""
        },
        onSubmit: (values) => {
    console.log("Form values:", values);
    axios
        .post("http://localhost:8080/login", {
            employee_id: values.employeeId,
            password: values.password,
        })
        .then((response) => {
            console.log("API response:", response.data);
            if (response.status === 200 && response.data.employee_id) {
                localStorage.setItem("cashierid", values.employeeId);
                navigate("/homepage");
            } else {
                alert("Invalid Credentials");
            }
        })
        .catch((error) => {
            console.error("Login error:", error.response || error.message);
            alert(error.response?.data || "Login failed. Please check your connection or credentials");
        });
},
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="position-relative py-0 my-0 px-1" style={{ height: "100vh" }}>
                <div
                    className="bg bg-light d-flex flex-column position-absolute bottom-0 p-4 my-0 rounded-top-4"
                    style={{ height: "80vh", width: "27vw" }}
                >
                    <p className="mb-0 wel-font">Welcome</p>
                    <h3 className="login-font mb-4">
                        <span className="text login-font" style={{ color: "#231CED" }}>Login</span> to your account
                    </h3>

                    <div className="d-flex flex-column gap-3">
                        <TextField
                            id="employee-id"
                            label="Employee ID"
                            value={formik.values.employeeId}
                            onChange={formik.handleChange}
                            name="employeeId"
                            error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                            helperText={formik.touched.employeeId && formik.errors.employeeId}
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": { fontSize: "15px", height: "50px" },
                                "& .MuiInputLabel-root": { fontSize: "15px" }
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            variant="outlined"
                            size="small"
                            type="password"
                            sx={{
                                "& .MuiInputBase-root": { fontSize: "15px", height: "50px" },
                                "& .MuiInputLabel-root": { fontSize: "15px" }
                            }}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ fontSize: "12px", padding: "8px 15px", minWidth: "80px", height: "50px", background: "#231CED" }}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>

                    <div className="mt-auto text-center">
                        <p className="pass-reset-text">
                            Can't login <a href="/reset-password" className="password-reset-link">Reset Password here</a>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default LoginRightSec;