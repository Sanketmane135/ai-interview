import React from "react";

const OtpInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      maxLength="6"
      placeholder="Enter OTP"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default OtpInput;
