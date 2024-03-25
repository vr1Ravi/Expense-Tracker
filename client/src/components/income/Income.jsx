import Sidebar from "../sidebar/Sidebar";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CgDollar } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { IoChatbubbleSharp } from "react-icons/io5";
const Income = () => {
  return (
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white">
        <header className="my-4 mx-3 border-b p-3">
          <h1 className="text-center text-xl font-bold text-blue-950">
            Total Income:{" "}
            <span className="text-green-500 font-semibold">{`$${0}`}</span>
          </h1>
        </header>

        <div className="grid grid-cols-2fr-3fr">
          {/* Form */}
          <div>
            <form className="p-4">
              <label htmlFor="income">Income title:</label>
              <input
                className=" cursor-pointer p-2 outline-none border rounded-md w-full"
                type="text"
                id="income"
                name="income"
                maxLength={20}
              />

              <label htmlFor="amount">Amount:</label>
              <input
                className=" cursor-pointer p-2 outline-none border rounded-md w-full"
                type="number"
                id="amount"
                name="amount"
              />
              <label htmlFor="date">Date:</label>
              <input
                className=" cursor-pointer p-2 outline-none border rounded-md w-full"
                type="date"
                id="date"
                name="date"
              />

              <label htmlFor="source">Source:</label>
              <input
                className=" cursor-pointer p-2 outline-none border rounded-md w-full"
                type="text"
                id="source"
                name="source"
                maxLength={20}
              />

              <label htmlFor="reference">Reference:</label>
              <textarea
                className=" cursor-pointer p-2 outline-none border rounded-md w-full"
                id="reference"
                name="reference"
                maxLength={55}
              ></textarea>

              <button
                type="submit"
                className="flex w-1/2 mx-auto items-center my-2 bg-blue-950 p-2 rounded-md text-white justify-center"
              >
                <IoIosAddCircle
                  style={{
                    marginRight: "5px",
                    fontSize: "20px",
                    color: "lime",
                    // backgroundColor: "white",
                    borderRadius: "100%",
                  }}
                />{" "}
                Add Income
              </button>
            </form>
          </div>

          {/* Incomes */}

          <div>
            <div className="p-4 flex shadow-lg rounded-md">
              <div className="mr-auto flex flex-col w-4/5">
                <div className="flex items-center">
                  <GoDotFill style={{ color: "green", marginRight: "6px" }} />
                  <h1 className="text-x font-semibold text-blue-950">
                    Youtube
                  </h1>
                </div>

                <div className="flex mt-2 w-full">
                  <small className="flex items-center mr-4 text-slate-500">
                    <CgDollar style={{ marginRight: "2px" }} /> 2000
                  </small>
                  <small className="flex items-center mr-4 text-slate-500">
                    <SlCalender style={{ marginRight: "2px" }} /> 12/12/2001
                  </small>
                  <small className="flex items-center mr-4 text-slate-500">
                    <IoChatbubbleSharp style={{ marginRight: "2px" }} /> My
                    youtubeincome
                  </small>
                </div>
              </div>
              <MdDeleteSweep
                style={{
                  fontSize: "1.5rem",
                  color: "crimson",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Income;
