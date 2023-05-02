export const companyPreferences = [
  {
    company_id: 1,
    table_name: "company_financials",
    column_name: "revenue",
    source: "gamma"
  },
  {
    company_id: 1,
    table_name: "company_employees",
    column_name: "*",
    source: "gamma"
  }
];

export const priorities = [
  {
    table_name: "company_financials",
    column_name: "*",
    source: "alpha",
    priority: 1
  },
  {
    table_name: "company_financials",
    column_name: "*",
    source: "beta",
    priority: 2
  },
  {
    table_name: "company_overviews",
    column_name: "*",
    source: "beta",
    priority: 1
  }
];

// 1. Company preferences take precedence over priorities
// 2. Exact matches on table name and column name take precedence over just matching table name
// 3. Lower priority number takes precedence over higher priority number (e.g. 1 is higher than 2)

// In this scenario, we should use all company financial revenue data from source gamma. If none is available we should fall back to alpha. If none is available we should fall back to beta
// For profit data, we should ignore gamma and use alpha. If none is available,we should fall back to beta
