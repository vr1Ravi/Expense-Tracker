import Sidebar from "../components/Sidebar";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useGetIncomeQuery } from "../components/apis/api";
import Item from "../components/Item";
import { MdOutlineSort } from "react-icons/md";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { setShowSideBar } from "../slices/item_slice";

const Income = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const dispatch = useDispatch();
  const { isFetching, data } = useGetIncomeQuery(page);
  
  useEffect(() => {
    if (data) setPageCount(data.pageCount);
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
    <section className=" w-screen grid grid-cols-1 md:grid-cols-1fr-4fr  gap-3 bg-slate-100 h-[100vh]">
      <Sidebar />
      <main className="bg-white relative ">
        <header className="my-4 mx-3 border-b p-3 flex md:block">
          <button
            onClick={() => dispatch(setShowSideBar(true))}
            className="md:hidden"
          >
            <MdOutlineSort style={{ fontSize: "2rem" }} />
          </button>
          <div className="w-full flex justify-start ml-7 md:justify-center md:ml-0 items-center">
            <h1 className="  text-xl font-bold text-blue-950 mr-[5px]">
              Total Income:
            </h1>
            <p className="text-green-500 font-semibold text-xl w-[10%]">
              {data?.total_income >= 0 ? (
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
        <div className="grid grid-rows-1 sm:grid-cols-2fr-3fr ">
          {/* Form */}
          <div>
            <Form type={"Income"} />
          </div>
          {/* Incomes */}
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
              {data?.incomes.map((income) => (
                <Item
                  type={"Income"}
                  key={income._id}
                  id={income._id}
                  title={income.title}
                  amount={income.amount}
                  date={income.date}
                  description={income.description}
                />
              ))}

              {!data?.incomes.length && !isFetching && (
                <h1 className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  No Income Yet
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

export default Income;
