import React from "react";

const Message = ({ text }) => {
  return (
    <div className="message__text">
      <p>{text}</p>
    </div>
  );
};

export default Message;
