import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetTransactionsQuery } from "../components/apis/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setShowSideBar } from "../slices/item_slice";
import { MdOutlineSort } from "react-icons/md";
import { useDispatch } from "react-redux";
import Item from "../components/Item";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

ChartJS.register(ArcElement, Tooltip, Legend);

const Transaction = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { data, isFetching, error } = useGetTransactionsQuery(page);
  const dispatch = useDispatch();

  // Chart
  const chart_data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "# of Money",
        data: [data?.total_income, data?.total_expense],
        backgroundColor: ["green", "red"],
        borderColor: ["white", "white"],
        borderWidth: 3,
      },
    ],
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.data.message, {
        duration: 3000,
        position: "top-center",
        icon: "❎",
        style: {
          color: "crimson",
        },
      });
    }
    if (data) {
      setPageCount(data?.pageCount);
    }
  }, [error, data]);
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
    <section className="grid  grid-cols-1 md:grid-cols-1fr-4fr  gap-3 bg-slate-100 h-[100vh] overflow-y-auto ">
      <Sidebar />
      <main className="bg-white relative px-3 dark:bg-slate-800 dark:text-white">
        <header className="my-4 mx-3 border-b p-3 flex md:block">
          <button
            onClick={() => dispatch(setShowSideBar(true))}
            className="md:hidden"
          >
            <MdOutlineSort style={{ fontSize: "2rem" }} />
          </button>
          <div className="w-full flex justify-start ml-7 md:justify-center md:ml-0 items-center">
            <h1 className="  text-xl font-bold text-blue-950 mr-[5px] dark:text-white">
              Transactions
            </h1>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2fr-3fr  ">
          {/* Incomes */}
          <div className="mx-auto mb-2">
            <Pie data={chart_data} />
            <h1 className="text-center font-bold mt-2">Pie-Chart</h1>
          </div>
          <div
            style={{ height: "calc(100vh - 7rem )" }}
            className="overflow-y-scroll"
          >
            <div className="flex flex-col gap-2   relative h-full">
              {isFetching &&
                Array(10)
                  .fill(null)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="p-4  shadow-inner border border-slate-400  rounded-md px-2 mr-[5px]"
                    >
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-700 rounded w-12"></div>
                          <div className="space-y-3">
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              {data?.transactions.map((transaction) => (
                <Item
                  type={transaction.category}
                  key={transaction._id}
                  id={transaction._id}
                  title={transaction.title}
                  amount={transaction.amount}
                  date={transaction.date}
                  description={transaction.description}
                />
              ))}

              {!data?.transactions.length && !isFetching && (
                <h1 className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  No Transactions Yet
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

export default Transaction;
