import {
  companyPreferences,
  priorities
} from "../constants/datasourcePreferences";
import { CompanyFinancial } from "../types/CompanyFinancial";

export const getPreferredFinancialData = (
  companyFinancials: CompanyFinancial[] | undefined
) => {
  if (!companyFinancials) return [];

  let revenueDatasource:
    | {
        company_id?: number;
        table_name: string;
        column_name: string;
        source: string;
      }
    | undefined = undefined;
  let profitDatasource:
    | {
        table_name: string;
        column_name: string;
        source: string;
        priority?: number;
      }
    | undefined = undefined;

  const tablePreferences = companyPreferences?.filter(
    (p) => p.table_name === "company_financials"
  );
  const tablePriorities = priorities?.filter(
    (p) => p.table_name === "company_financials"
  );

  if (tablePriorities?.length) {
    const foundRevenue = tablePriorities.find(
      (p) => p.column_name === "revenue"
    );
    const foundProfit = tablePriorities.find((p) => p.column_name === "profit");
    revenueDatasource = foundRevenue || tablePriorities[0];
    profitDatasource = foundProfit || tablePriorities[0];
  }

  if (tablePreferences?.length) {
    //company datasource preferences has precedence over organisation priorities.
    const foundRevenue = tablePreferences?.find(
      (p) => p.column_name === "revenue"
    );
    const foundProfit = tablePreferences?.find(
      (p) => p.column_name === "profit"
    );

    if (foundRevenue) revenueDatasource = foundRevenue;
    else {
      const foundCatchAllRevenue = tablePreferences?.find(
        (p) => p.column_name === "*"
      );
      if (foundCatchAllRevenue) revenueDatasource = foundCatchAllRevenue;
    }
    if (foundProfit) profitDatasource = foundProfit;
    else {
      const foundCatchAllProfit = tablePreferences?.find(
        (p) => p.column_name === "*"
      );
      if (foundCatchAllProfit) profitDatasource = foundCatchAllProfit;
    }
  }

  const years = [
    // @ts-ignore
    ...new Set(companyFinancials.map((financial) => financial.name))
  ];

  const preferredData = [];

  for (const year of years) {
    // the data for the year and preferred data source
    const revenueDataForYear = companyFinancials.filter(
      (financial) =>
        financial.name === year &&
        financial.source === revenueDatasource?.source
    );
    const profitDataForYear = companyFinancials.filter(
      (financial) =>
        financial.name === year && financial.source === profitDatasource?.source
    );

    preferredData.push({
      name: year,
      revenue: revenueDataForYear[0].revenue,
      profit: profitDataForYear[0].profit,
      amt: 0
    });
  }

  console.log("preferredData", JSON.stringify(preferredData));

  return preferredData;
};
