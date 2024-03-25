import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Income from "./components/income/Income";
import Transaction from "./components/transaction/Transaction";
import Expense from "./components/expense/Expense";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
