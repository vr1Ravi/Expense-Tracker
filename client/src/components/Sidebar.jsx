import avatar from "../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { setShowSideBar } from "../slices/item_slice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.item);

  return (
    <aside
      className={` -translate-x-[100vw]   ${
        showSidebar ? " animate-sidebar" : ""
      } z-10 absolute  md:static flex flex-col bg-white h-full border-r-2 md:translate-x-0`}
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
          <h2 className="text-xl font-semibold">Ravishankar</h2>
          <small>Your Money</small>
        </div>
      </div>

      {/* Links */}
      <div className="my-6 mx-3 flex flex-col justify-center">
        <ul className="m-4">
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
          <li className="flex items-center my-4 rounded-md p-2 cursor-pointer">
            <CiLight className="mr-2" /> <p>Light</p>
          </li>
        </ul>
      </div>
    </aside>
  );
};

// eslint-disable-next-line react/prop-types
const Li = ({ dispatch, location, url, text, Icon }) => (
  <li
    onClick={() => dispatch(setShowSideBar(false))}
    className={`flex items-center my-4 rounded-md p-2 ${
      // eslint-disable-next-line react/prop-types
      location.pathname === url ? "text-blue-500 bg-blue-100" : "text-black"
    }`}
  >
    <Icon />
    <Link to={url} className="ml-2 w-full">
      {text}
    </Link>
  </li>
);

export default Sidebar;
