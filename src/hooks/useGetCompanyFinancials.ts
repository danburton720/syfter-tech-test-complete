import { useQuery } from "@tanstack/react-query";

import { getCompanyFinancials } from "../services/companyFinancials";

const useGetCompanyFinancials = () => {
  const { isLoading, data: companyFinancials } = useQuery({
    queryKey: ["company-financials"],
    queryFn: () => getCompanyFinancials(),
    retry: 0,
    refetchOnWindowFocus: false
  });
  return { isLoading, companyFinancials };
};

export default useGetCompanyFinancials;
