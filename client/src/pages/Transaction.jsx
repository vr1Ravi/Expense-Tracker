import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetTransactionsQuery } from "../components/apis/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
ChartJS.register(ArcElement, Tooltip, Legend);
const Transaction = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetTransactionsQuery(page);
  console.log(data);
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
  }, [error]);
  return (
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white"></main>
    </section>
  );
};

export default Transaction;
