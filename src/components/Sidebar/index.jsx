import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import Navbar from '../Navbar'

const Sidebar = ({ index }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleRoute = (route) => {
    if (route === "logout") {
      window.localStorage.clear();
      window.location.reload();
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <>
      <div className="navBar">
        <div className="navBar_left">
          <i
            className="fas fa-bars"
            onClick={() => setOpen((prev) => !prev)}
          ></i>
        </div>
        <div className="navBar_right"></div>
      </div>
      {
        <div className={!open ? "sideBar" : "sideBar sideBar_sidebarActive"}>
          <div className={open ? "sideBar_inner" : "sideBar_innersmall"}>
            <div
              onClick={() => handleRoute("articles")}
              className={
                index === 2 ? "sideBar_title sideBar_active" : "sideBar_title"
              }
            >
              <i className="fas fa-newspaper"></i>Articles
            </div>
            {/* <div
              onClick={() => handleRoute("newsFeed")}
              className={
                index === 1 ? "sideBar_title sideBar_active" : "sideBar_title"
              }
            >
               <i className="fas fa-newspaper"></i>News Feed
            </div> */}

            <div
              onClick={() => handleRoute("logout")}
              className="sideBar_title"
            >
              <i className="fas fa-power-off"></i>Logout
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Sidebar;
