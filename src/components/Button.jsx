import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-[#95af00] rounded hover:bg-[#adc03efb]"
      >
        {props.icon}
        {props.text}
      </button>
    </>
  );
};

export default Button;
