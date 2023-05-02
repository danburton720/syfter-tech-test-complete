import axios from "axios";

import { CompanyFinancial } from "../types/CompanyFinancial";

// https://mocki.io/ for the API used here

export const getCompanyFinancials = async () => {
  const result: {
    data: CompanyFinancial[];
  } = await axios.get(
    "https://mocki.io/v1/56597659-8f61-4ffc-8ace-daa52f138c52"
  );

  if (result && result.data) return result.data;
  return [];
};
