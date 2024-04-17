import { MdOutlineSort } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { setShowSideBar } from "../slices/item_slice";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useGetTransactionsQuery } from "../components/apis/api";
import Item from "../components/Item";
import { useEffect } from "react";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.item);
  const { data, isFetching, error } = useGetTransactionsQuery(1, token);

  useEffect(() => {
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
  }, [error]);

  const chart_options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };
  const chart_data = {
    labels: data?.transactions
      .map((transaction) => new Date(transaction.date))
      .sort((a, b) => a - b)
      .map((transaction) => transaction.toISOString().split("T")[0]),
    datasets: [
      {
        label: "Income",
        data: data?.transactions
          .filter((transaction) => transaction.category === "income")
          .map((transaction) => transaction.amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "green",
      },
      {
        label: "Expense",
        data: data?.transactions
          .filter((transaction) => transaction.category === "expense")
          .map((transaction) => transaction.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "red",
      },
    ],
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white dark:bg-slate-800 dark:text-white">
        <header className="my-4 mx-3 border-b p-3 flex md:block">
          <button
            onClick={() => dispatch(setShowSideBar(true))}
            className="md:hidden"
          >
            <MdOutlineSort style={{ fontSize: "2rem" }} />
          </button>
          <div className="w-full flex justify-start ml-7 md:justify-center md:ml-0 items-center">
            <h1 className="  text-xl font-bold text-blue-950 mr-[5px] dark:text-white">
              Dashboard
            </h1>
          </div>
        </header>
        <div className="flex gap-1 flex-col md:flex-row">
          <div className="w-full p-2 md:w-1/2">
            <Line options={chart_options} data={chart_data} />
          </div>
          <div className="flex flex-col w-full p-2 md:w-1/2 gap-3">
            <h1 className="text-xl font-bold text-blue-950 text-center dark:text-white">
              Recent Transactions
            </h1>
            {data?.transactions.slice(-3).map((transaction) => (
              <Item
                isDashboard={true}
                type={transaction.category}
                key={transaction._id}
                id={transaction._id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                description={transaction.description}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
