import { MdDeleteSweep } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CgDollar } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
// eslint-disable-next-line react/prop-types
const IncomeItem = ({ title, amount, date, description }) => {
  const dispatch = useDispatch();
  const handleDeleteIcome = () => {};
  return (
    <div className="p-4 flex shadow-inner border border-slate-400  rounded-md px-2 mr-[5px]">
      <div className="mr-auto flex flex-col w-4/5">
        <div className="flex items-center">
          <GoDotFill style={{ color: "green", marginRight: "6px" }} />
          <h1 className="text-x font-semibold text-blue-950">{title}</h1>
        </div>

        <div className="flex mt-2 w-full items-center">
          <small className="flex items-center mr-4 text-slate-500">
            <CgDollar style={{ marginRight: "2px" }} /> {amount}
          </small>
          <small className="flex items-center mr-4 text-slate-500">
            <SlCalender style={{ marginRight: "2px" }} /> {date}
          </small>
          <small className="flex items-center mr-4 text-slate-500">
            <IoChatbubbleSharp style={{ marginRight: "2px" }} /> {description}
          </small>
        </div>
      </div>
      <button onClick={handleDeleteIcome} className=" h-6">
        <MdDeleteSweep
          style={{
            fontSize: "1.5rem",
            color: "crimson",
            cursor: "pointer",
          }}
        />
      </button>
    </div>
  );
};

export default IncomeItem;
