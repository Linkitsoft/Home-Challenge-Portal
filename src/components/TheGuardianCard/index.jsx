import React, { useState } from "react";
import { toast } from "react-toastify";

const TheGuardianCard = ({ item }) => {
  // handle link the guardians
  const handleGuardians = () => {
    window.open(item?.webUrl);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleGuardians}
      className="article_all"
    >
      <div className="article_content">
        <div className="article_layout">
          <div className="article_top">
            <div className="circle">
              <i className="fas fa-save"></i>
            </div>
            {/* <p>Article #{item.id}</p> */}
          </div>
          <div className="corner">
            <p>{item?.webPublicationDate}</p>
          </div>
        </div>
        <p className="article_title">{item?.webTitle}</p>
        <p className="article_desc">{item?.description}</p>
        <div className="article_bottom">
          <p className="name"> Type : {item?.type}</p>
          {/* <p className="role">{item.designation}</p> */}
        </div>
      </div>
    </div>
  );
};

export default TheGuardianCard;
