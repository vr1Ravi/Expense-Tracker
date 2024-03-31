import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import LoginOrReg from "./pages/LoginOrReg";
import VerifyOtp from "./pages/VerifyOtp";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Income = lazy(() => import("./pages/Income"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Expense = lazy(() => import("./pages/Expense"));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/welcome" element={<LoginOrReg />} />
            <Route path="/verify/:id" element={<VerifyOtp />} />
            <Route path="/income" element={<Income />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
