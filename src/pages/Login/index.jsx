import React from "react";
import { useState, useEffect } from "react";
import signal from "../../assets/radio.png"
import girl from "../../assets/girl.png"

const Login = () => {

  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState({})
  const [indexS, setIndexS] = useState(-1)

  useEffect(() => {
    // Generate user data (replace this with your actual user data)
    const generateUserList = () => {
      const numberOfUsers = 7; // Change this to the actual number of users
      const userList = [];

      for (let i = 0; i < numberOfUsers; i++) {
        userList.push({
          id: i,
          profilePicture: girl, // Replace with the path to your user's profile picture
        });
      }

      return userList;
    };

    setUserList(generateUserList());
  }, []);

  const calculateUserPosition = (index, totalUsers) => {
    const angle = (index / totalUsers) * 360; // Calculate the angle for each user
    const radius = 132; // Adjust this value based on your design
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);

    return { x, y };
  };


  return (
    <div className="signal">
      <div className="signal_box">
        <div className="signal_circle">
          <img src={signal} alt="signal" />
          {userList.map((user, index) => {
            const { x, y } = calculateUserPosition(index, userList.length);
            return (
              <div
                onClick={() => { setSelected(user); setIndexS(index) }}
                key={user.id}
                className="user_icon"
                style={{ position: 'absolute', top: `calc(50% - 40px + ${y}px)`, left: `calc(50% - 40px + ${x}px)` }}
              >
                <img className={index === indexS && "selectImg"} src={girl} alt={`user-${user.id}`} />
              </div>
            );
          })}
        </div>

        {selected &&
          <div className="signal_bottomSec">
            <div className="signal_text">
              <img src={girl} alt="img" />
              <p className="name">John</p>
              <p className="phone">+2323 2323232</p>
              <button>Choose</button>
            </div>
          </div>
        }
      </div>

    </div>
  );
};

export default Login;
