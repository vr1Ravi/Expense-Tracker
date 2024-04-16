import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const LoginOrReg = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://expense-tracker-rlxs.onrender.com/api/v1/register-or-login",
        { mobile: phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => navigate(`/verify/${data?.user_id}`), 1000);
      toast.success(`${data?.message}`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    } catch (error) {
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
        Login Or Signup
      </h1>
      <input
        className="p-2 outline-none border rounded-sm w-[95%]"
        type="number"
        placeholder="Enter 10 digit phone number"
        min={0}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={phone.length !== 10}
        className={` rounded-md w-1/2 p-2 text-white ${
          phone.length !== 10 ? "bg-gray-300" : "bg-green-600"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default LoginOrReg;
