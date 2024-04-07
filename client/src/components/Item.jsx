import { MdDeleteSweep } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CgDollar } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useRemoveExpenseMutation, useRemoveIncomeMutation } from "./apis/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Item = ({
  type,
  id,
  title,
  amount,
  date,
  description,
  isDashboard = false,
}) => {
  console.log(type);
  const [removeIncome, { data: income_remove_data, error: income_add_error }] =
    useRemoveIncomeMutation();

  const [
    removeExpense,
    { data: expense_remove_data, error: expense_add_error },
  ] = useRemoveExpenseMutation();
  useEffect(() => {
    if (income_remove_data) {
      toast.success(`income removed`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    }
    if (expense_remove_data) {
      toast.success(`expense removed`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    }
  }, [income_remove_data, expense_remove_data]);

  const handleDeleteIcome = (id) => {
    if (type === "Income") {
      removeIncome(id);
    } else {
      removeExpense(id);
    }
  };
  return (
    <div className="p-4 flex shadow-inner border border-slate-400  rounded-md px-2 mr-[5px]">
      <div className="mr-auto flex flex-col w-4/5">
        <div className="flex items-center">
          <GoDotFill
            style={{
              color: type === "income" ? "green" : "crimson",
              marginRight: "6px",
            }}
          />
          <h1 className="text-x font-semibold text-blue-950">{title}</h1>
        </div>

        <div className="flex mt-2 w-[120%] items-center">
          <small className="flex items-center mr-4 text-slate-500">
            <CgDollar style={{ marginRight: "2px" }} /> {amount}
          </small>
          <small className="flex items-center mr-4 text-slate-500">
            <SlCalender style={{ marginRight: "2px" }} /> {date}
          </small>
          <IoChatbubbleSharp style={{ marginRight: "2px", color: "grey" }} />
          <small className="flex items-center  text-slate-500 flex-1 text-ellipsis overflow-hidden text-nowrap">
            {description}
          </small>
        </div>
      </div>
      {!isDashboard && (
        <button onClick={() => handleDeleteIcome(id)} className=" h-6">
          <MdDeleteSweep
            style={{
              fontSize: "1.5rem",
              color: "crimson",
              cursor: "pointer",
            }}
          />
        </button>
      )}
    </div>
  );
};

export default Item;
