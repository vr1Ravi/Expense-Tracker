import Sidebar from "../components/Sidebar";

const Transaction = () => {
  return (
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white">Transaction</main>
    </section>
  );
};

export default Transaction;
