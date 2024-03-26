import { IoIosAddCircle } from "react-icons/io";
import { Oval } from "react-loader-spinner";

import { useAddIncomeMutation } from "./apis/api";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const Form = ({ setRecentlyAddedIncome }) => {
  const [addIncome, { error, isLoading, data }] = useAddIncomeMutation();

  useEffect(() => {
    setRecentlyAddedIncome(data?.income);
  }, [data]);
  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const amount = formData.get("amount");
    const date = formData.get("date");
    const description = formData.get("description");
    const newIncome = { title, amount, date, description };
    addIncome(newIncome);
  };
  return (
    <form onSubmit={handleIncomeSubmit} className="p-4">
      <label htmlFor="title">Income title:</label>
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
        className="flex w-1/2 mx-auto items-center my-2 bg-blue-950 p-2 rounded-md text-white justify-center"
      >
        {isLoading ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="white"
            ariaLabel="oval-loading"
            wrapperStyle={{ margin: "0 auto" }}
          />
        ) : (
          <>
            <IoIosAddCircle
              style={{
                marginRight: "5px",
                fontSize: "20px",
                color: "lime",
                borderRadius: "100%",
              }}
            />
            Add Income
          </>
        )}
      </button>
    </form>
  );
};

export default Form;
