import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import LoginOrReg from "./pages/LoginOrReg";
import VerifyOtp from "./pages/VerifyOtp";
import Loader from "./components/Loader";
import GlobalCatch from "./pages/404";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Income = lazy(() => import("./pages/Income"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Expense = lazy(() => import("./pages/Expense"));

function App() {
  const [token, _] = useState(localStorage.getItem("token") || null);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={token ? <Dashboard /> : <LoginOrReg />} />
            <Route
              path="/welcome"
              element={token ? <Navigate to="/" replace /> : <LoginOrReg />}
            />
            <Route
              path="/verify/:id"
              element={token ? <Navigate to="/" replace /> : <VerifyOtp />}
            />
            <Route
              path="/income"
              element={token ? <Income /> : <Navigate to="/" replace />}
            />
            <Route
              path="/transaction"
              element={token ? <Transaction /> : <Navigate to="/" replace />}
            />
            <Route
              path="/expense"
              element={token ? <Expense /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<GlobalCatch />} />
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
