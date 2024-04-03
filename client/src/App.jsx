import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import LoginOrReg from "./pages/LoginOrReg";
import VerifyOtp from "./pages/VerifyOtp";
import { useCookies } from "react-cookie";
import Loader from "./components/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Income = lazy(() => import("./pages/Income"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Expense = lazy(() => import("./pages/Expense"));

function App() {
  const [cookies] = useCookies(["token"]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/welcome"
              element={cookies ? <Navigate to="/" replace /> : <LoginOrReg />}
            />
            <Route
              path="/verify/:id"
              element={cookies ? <Navigate to="/" replace /> : <VerifyOtp />}
            />
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
