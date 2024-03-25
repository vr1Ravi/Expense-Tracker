import Sidebar from "../sidebar/Sidebar";

const Expense = () => {
  return (
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white">Expense</main>
    </section>
  );
};

export default Expense;
