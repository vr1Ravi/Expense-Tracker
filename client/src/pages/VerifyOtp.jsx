import { useParams } from "react-router";
import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/verify-otp",
        {
          otp,
          user_id: id,
        },
        {
          withCredentials: true,
          httpOnly: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => navigate(`/`), 1000);
      toast.success(`${data?.message}`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.data.response.message, {
        duration: 3000,
        position: "top-center",
        icon: "❎",
        style: {
          color: "crimson",
        },
      });
    }
  };
  return (
    <div className="h-1/3 justify-between mx-4 w-full md:w-[500px] border border-slate-200 rounded-md p-4 flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className=" text-xl font-semibold text-blue-950 text-center ">
        Enter OTP
      </h1>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle="w-full md:w-[90%] flex justify-evenly"
        inputStyle={{
          width: "2rem",
          border: "1px solid gray",
          outline: "none",
          borderRadius: "5px",
        }}
        inputType="number"
      />
      <button
        onClick={handleVerifyOtp}
        disabled={otp.length !== 4}
        className={` rounded-md w-1/2 p-2 text-white ${
          otp.length !== 4 ? "bg-gray-300" : "bg-green-600"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default VerifyOtp;
