import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instance from "../../Instance/instance";

const Login = () => {
  const [eyeIcon, setEyeIcon] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const body = {
      email: formData?.email,
      password: formData?.password
    }
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
    } else if (!formData?.email?.match(regexEmail)) {
      setEmailValid(true);
    } else {
      const res = await instance.post("signin", body)
      if (res?.data?.response) {
        window.localStorage.setItem("isLogged", "authorize");
        window.localStorage.setItem("token", res?.data?.token);
        window.location.reload();
        navigate("/articles")
      }else if(res?.data?.message === "Invalid User Credentials"){
        toast.error("Invalid User Credentials")
      }
    }
  };

  return (
    <div className="login">
      <div className="login_box">
        <div className="login_inputSection">
          <p className="login_head">
            Welcome! Please <br /> Login to continue{" "}
          </p>
          <label className="login_label">Email</label>
          <div className="login_inputWrapper">
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />
          </div>

          {emailValid && (
            <div className="login_emailValid">
              <p>* Email is not Valid *</p>{" "}
            </div>
          )}

          <label className="login_label">Password</label>
          <div className="login_inputWrapper">
            <input
              type={!eyeIcon ? "password" : "text"}
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <i
              onClick={() => setEyeIcon(!eyeIcon)}
              className={
                eyeIcon === false
                  ? "fas fa-eye-slash showEye"
                  : "fas fa-eye showEye"
              }
            ></i>
          </div>
          {/* <label className="login_label">Select Role</label>
          <div className="login_inputWrapper">
            <select name="role" onChange={handleInput}>
              <option value="" disabled selected>
                Choose a role
              </option>
              {RoleData.map((role) => (
                <option key={role.roleId} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="login_needAccount">
            <p onClick={() => navigate("/signup")}>Don't have an account?</p>
          </div>
          <div className="login_loginBtn">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
