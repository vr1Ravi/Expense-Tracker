import Sidebar from "../sidebar/Sidebar";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useGetIncomeQuery } from "../apis/api";
import IncomeItem from "./incomeItem";
import Form from "../Form";
const Income = () => {
  const [page, setPage] = useState(1);
  const [recentlyAddedIncome, setRecentlyAddedIncome] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const { isFetching, data } = useGetIncomeQuery(page);
  useEffect(() => {
    setPageCount(data?.pageCount);
  }, [data]);

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
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh]">
      <Sidebar />
      <main className="bg-white relative">
        <header className="my-4 mx-3 border-b p-3 ">
          <div className="w-full flex justify-center items-center">
            <h1 className="text-center  text-xl font-bold text-blue-950 mr-[5px]">
              Total Income:
            </h1>
            <p className="text-green-500 font-semibold text-xl w-[10%]">
              {data?.total_income ? (
                `$${data.total_income}`
              ) : (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="green"
                  ariaLabel="oval-loading"
                  wrapperStyle={{ marginLeft: "10px" }}
                />
              )}
            </p>
          </div>
        </header>
        <div className="grid grid-cols-2fr-3fr">
          {/* Form */}
          <div>
            <Form setRecentlyAddedIncome={setRecentlyAddedIncome} />
          </div>
          {/* Incomes */}
          <div
            style={{ height: "calc(100vh - 7rem )" }}
            className="overflow-y-scroll"
          >
            <div className="flex flex-col gap-2">
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
              {recentlyAddedIncome && (
                <IncomeItem
                  key={recentlyAddedIncome._id}
                  id={recentlyAddedIncome.id}
                  title={recentlyAddedIncome.title}
                  amount={recentlyAddedIncome.amount}
                  date={recentlyAddedIncome.date}
                  description={recentlyAddedIncome.description}
                />
              )}
              {data?.incomes.map((income) => (
                <IncomeItem
                  key={income._id}
                  id={income.id}
                  title={income.title}
                  amount={income.amount}
                  date={income.date}
                  description={income.description}
                />
              ))}
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

export default Income;
