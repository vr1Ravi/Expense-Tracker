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
            <Route
              path="/"
              element={cookies.token ? <Dashboard /> : <LoginOrReg />}
            />
            <Route
              path="/welcome"
              element={
                cookies.token ? <Navigate to="/" replace /> : <LoginOrReg />
              }
            />
            <Route
              path="/verify/:id"
              element={
                cookies.token ? <Navigate to="/" replace /> : <VerifyOtp />
              }
            />
            <Route
              path="/income"
              element={cookies.token ? <Income /> : <Navigate to="/" replace />}
            />
            <Route
              path="/transaction"
              element={
                cookies.token ? <Transaction /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/expense"
              element={
                cookies.token ? <Expense /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
