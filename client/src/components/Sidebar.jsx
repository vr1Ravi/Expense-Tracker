import avatar from "../assets/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { setShowSideBar, setTheme } from "../slices/item_slice";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const { showSidebar, theme } = useSelector((state) => state.item);

  const handleTheme = () => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    dispatch(setTheme(localStorage.getItem("theme")));
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = async () => {
    try {
      const { data } = axios.get("/api/v1/logout");
      toast.success(`${data.message}`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
      setTimeout(navigate("/"), 2000);
    } catch (error) {
      toast.error(error?.data.response.message, {
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
    <aside
      className={` -translate-x-[100vw]   ${
        showSidebar ? " animate-sidebar" : ""
      } z-10 absolute  md:static flex flex-col bg-white  dark:bg-slate-800 dark:text-white h-full border-r-2 md:translate-x-0`}
    >
      {/* Profile */}
      <button
        onClick={() => {
          dispatch(setShowSideBar(false));
        }}
        className="ml-auto mr-[4px] mt-[4px] md:hidden"
      >
        <RxCross2 style={{ fontSize: "1.5rem" }} />
      </button>
      <div className="my-4 mx-3 flex items-center">
        <img className="w-14 mr-2" src={avatar} alt="avatar" />
        <div>
          <h2 className="text-xl font-semibold">Hello, Friend</h2>
          <small>Your Money</small>
        </div>
      </div>

      {/* Links */}
      <div className="my-6 mx-3 flex flex-col justify-center">
        <ul className="m-4 ">
          <Li
            dispatch={dispatch}
            location={location}
            url={"/"}
            text={"Dashboard"}
            Icon={MdDashboard}
          />
          <Li
            dispatch={dispatch}
            location={location}
            url={"/transaction"}
            text={"Transactions"}
            Icon={AiOutlineTransaction}
          />
          <Li
            dispatch={dispatch}
            location={location}
            url={"/income"}
            text={"Income"}
            Icon={FaMoneyBillTrendUp}
          />
          <Li
            dispatch={dispatch}
            location={location}
            url={"/expense"}
            text={"Expense"}
            Icon={GiPayMoney}
          />
          <li className="flex items-center my-4 rounded-md p-2 cursor-pointer mb-auto">
            <button
              onClick={handleTheme}
              className="border border-gray-200  rounded-md p-2"
            >
              {theme === "dark" ? <MdDarkMode /> : <CiLight />}
            </button>
          </li>
        </ul>
      </div>
      <div className="relative mt-auto mr-auto mb-4 ml-auto">
        <button
          onMouseOver={() => setShowLogout(true)}
          onMouseOut={() => setShowLogout(false)}
          onClick={handleLogout}
          className=" text-2xl "
        >
          <span
            className={`text-xs absolute -right-8 -top-4 ${
              showLogout ? "block" : "hidden"
            }`}
          >
            Logout
          </span>
          <TbLogout2 />
        </button>
      </div>
    </aside>
  );
};

// eslint-disable-next-line react/prop-types
const Li = ({ dispatch, location, url, text, Icon }) => (
  <li
    onClick={() => dispatch(setShowSideBar(false))}
    className={`dark:text-white  flex items-center my-4 rounded-md p-2 ${
      // eslint-disable-next-line react/prop-types
      location.pathname === url
        ? "text-blue-500 dark:text-black dark:bg-gray-700 bg-blue-100"
        : "text-black"
    }`}
  >
    <Icon />
    <Link to={url} className="ml-2 w-full">
      {text}
    </Link>
  </li>
);

export default Sidebar;
