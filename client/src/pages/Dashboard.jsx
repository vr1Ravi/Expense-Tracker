import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-1fr-4fr gap-3 bg-slate-100 h-[100vh] overflow-y-auto">
      <Sidebar />
      <main className="bg-white">main</main>
    </section>
  );
};

export default Dashboard;
