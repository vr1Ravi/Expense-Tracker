import { useParams } from "react-router";
import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://expense-tracker-backend-umber.vercel.app/api/v1/verify-otp",
        // "/api/v1/verify-otp",

        {
          otp,
          user_id: id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", data.token);
      setTimeout(() => location.reload("/"), 1000);
      toast.success(`${data?.message}`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
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
    <div className="h-1/3 justify-between mx-4 w-full md:w-[500px] border border-blue-950 rounded-md p-4 flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
        {loading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
};

export default VerifyOtp;
