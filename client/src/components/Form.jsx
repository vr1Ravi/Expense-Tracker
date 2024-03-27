import { IoIosAddCircle } from "react-icons/io";
import { Oval } from "react-loader-spinner";
import { useAddExpenseMutation, useAddIncomeMutation } from "./apis/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Form = ({ type }) => {
  const [
    addIncome,
    { error: incomeError, isLoading: incomeIsLoading, data: incomeData },
  ] = useAddIncomeMutation();
  const [
    addExpense,
    { error: expenseError, isLoading: expenseIsLoading, data: expenseData },
  ] = useAddExpenseMutation();

  useEffect(() => {
    if (incomeData || expenseData) {
      toast.success(`${type} added`, {
        duration: 3000,
        position: "top-center",
        icon: "✅",
      });
    }
    if (incomeError || expenseError) {
      toast.error(
        incomeError ? incomeError.data.message : expenseError.data.message,
        {
          duration: 3000,
          position: "top-center",
          icon: "❎",
          style: {
            color: "crimson",
          },
        }
      );
    }
  }, [incomeData, expenseData, incomeError, expenseError]);

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const amount = formData.get("amount");
    const date = formData.get("date");
    const description = formData.get("description");
    const newItem = { title, amount, date, description };
    type === "Income" ? addIncome(newItem) : addExpense(newItem);
  };
  return (
    <form onSubmit={handleIncomeSubmit} className="p-4">
      <label htmlFor="title"> {type} title:</label>
      <input
        className=" cursor-pointer p-2 outline-none border rounded-md w-full"
        type="text"
        id="title"
        name="title"
        maxLength={20}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        className=" cursor-pointer p-2 outline-none border rounded-md w-full"
        type="number"
        id="amount"
        name="amount"
      />
      <label htmlFor="date">Date:</label>
      <input
        className=" cursor-pointer p-2 outline-none border rounded-md w-full"
        type="date"
        id="date"
        name="date"
      />

      <label htmlFor="description">Reference:</label>
      <textarea
        className=" cursor-pointer p-2 outline-none border rounded-md w-full"
        id="description"
        name="description"
        maxLength={55}
      ></textarea>

      <button
        type="submit"
        className="flex  mx-auto items-center my-2 bg-blue-950 p-2 rounded-md text-white justify-center"
      >
        {incomeIsLoading || expenseIsLoading ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="white"
            ariaLabel="oval-loading"
            wrapperStyle={{ margin: "0 auto" }}
          />
        ) : (
          <IoIosAddCircle
            style={{
              marginRight: "5px",
              fontSize: "20px",
              color: "lime",
              borderRadius: "100%",
            }}
          />
        )}

        {type === "Income" ? "Add Income" : "Add Expense"}
      </button>
    </form>
  );
};

export default Form;
