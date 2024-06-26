import { MdOutlineSort } from "react-icons/md";
import { setShowSideBar } from "../slices/item_slice";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

import Form from "../components/Form";
import { useGetExpenseQuery } from "../components/apis/api";
import Item from "../components/Item";

import toast from "react-hot-toast";
import ItemLoading from "../components/ItemLoading";
import OvalLoader from "../components/OvalLoader";
const Expense = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const dispatch = useDispatch();
  const { isFetching, error, data } = useGetExpenseQuery(page);

  useEffect(() => {
    if (data) setPageCount(data.pageCount);
    if (error) {
      toast.error(error.data.message, {
        duration: 3000,
        position: "top-center",
        icon: "❎",
        style: {
          color: "crimson",
        },
      });
    }
  }, [data, error]);

  const nextPage = () => {
    if (page !== pageCount) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  return (
    <section className=" w-screen grid grid-cols-1 md:grid-cols-1fr-4fr  gap-3 bg-slate-100 h-[100vh]">
      <Sidebar />
      <main className="bg-white relative dark:text-white dark:bg-slate-800">
        <header className="my-4 mx-3 border-b p-3 flex md:block">
          <button
            onClick={() => dispatch(setShowSideBar(true))}
            className="md:hidden"
          >
            <MdOutlineSort style={{ fontSize: "2rem" }} />
          </button>
          <div className="w-full flex justify-start ml-7 md:justify-center md:ml-0 items-center">
            <h1 className="  text-xl font-bold text-blue-950 mr-[5px] dark:text-white">
              Total Expense:
            </h1>
            <div className="text-green-500 font-semibold text-xl w-[10%]">
              {data?.total_expense >= 0 ? (
                `$${data.total_expense}`
              ) : (
                <OvalLoader />
              )}
            </div>
          </div>
        </header>
        <div className="grid grid-rows-1 sm:grid-cols-2fr-3fr ">
          {/* Form */}
          <div>
            <Form type={"Expense"} />
          </div>
          {/* Incomes */}
          <div
            style={{ height: "calc(100vh - 7rem )" }}
            className="overflow-y-scroll"
          >
            <div className="flex flex-col gap-2 relative h-full">
              {isFetching && <ItemLoading />}

              {data?.expenses.map((expense) => (
                <Item
                  type={"Expense"}
                  key={expense._id}
                  id={expense._id}
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
                  description={expense.description}
                />
              ))}
              {!data?.expenses.length && !isFetching && (
                <h1 className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  No Expense Yet
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-[100px] justify-between absolute bottom-0 left-[65%] bg-transparent">
          <button onClick={prevPage} disabled={page === 1}>
            <GrFormPreviousLink
              style={{ fontSize: "2rem", color: page === 1 ? "gray" : "black" }}
            />
          </button>
          <button onClick={nextPage} disabled={page === pageCount}>
            <GrFormNextLink
              style={{
                fontSize: "2rem",
                color: page === pageCount ? "gray" : "black",
              }}
            />
          </button>
        </div>
      </main>
    </section>
  );
};

export default Expense;
