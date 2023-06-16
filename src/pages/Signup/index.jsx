import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instance from "../../Instance/instance";

const Signup = () => {
  const [eyeIcon, setEyeIcon] = useState(false);
  const [eyeIcon2, setEyeIcon2] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const body = {
      name: formData?.name,
      email: formData?.email,
      contact: formData?.contact,
      password: formData?.password,
    };
    if (
      !formData?.name ||
      !formData.email ||
      !formData.password ||
      !formData.contact
    ) {
      toast.error("All fields are required");
    } else if (formData?.password !== formData?.confirmPassword) {
      toast.error("Please Confirm The Password");
    } else if (!formData?.email?.match(regexEmail)) {
      setEmailValid(true);
    } else {
      const res = await instance.post("/signUp", body);
      console.log("res", res) 
      // navigate("/login");
    }
  };

  return (
    <div className="login">
      <div className="login_box shadow">
        <div className="login_inputSection">
          <p className="login_head">
            Welcome! Please <br /> Signup to continue{" "}
          </p>
          <label className="login_label">Name</label>
          <div className="login_inputWrapper">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInput}
            />
          </div>
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

          <label className="login_label">Contact</label>
          <div className="login_inputWrapper">
            <input
              type="number"
              placeholder="Contact"
              name="contact"
              onChange={handleInput}
            />
          </div>

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

          <label className="login_label">Confirm Password</label>
          <div className="login_inputWrapper">
            <input
              type={!eyeIcon2 ? "password" : "text"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInput}
            />
            <i
              onClick={() => setEyeIcon2(!eyeIcon2)}
              className={
                eyeIcon2 === false
                  ? "fas fa-eye-slash showEye"
                  : "fas fa-eye showEye"
              }
            ></i>
          </div>

          <div className="login_loginBtn">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
