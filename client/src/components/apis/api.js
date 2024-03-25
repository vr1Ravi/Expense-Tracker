import axios from "axios";
import {
  addIncomeFailure,
  addIncomeRequest,
  addIncomeSuccess,
} from "../../slices/income_slice";

export const addIncome = (income) => {
  return async (dispatch) => {
    try {
      dispatch(addIncomeRequest());
      const { data } = await axios.post("/api/v1/add-income", { income });
      dispatch(addIncomeSuccess());
    } catch (error) {
      dispatch(addIncomeFailure(error.response.data.message));
    }
  };
};
