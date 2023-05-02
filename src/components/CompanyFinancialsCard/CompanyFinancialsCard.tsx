import React, { useMemo } from "react";
import { Grid, Card, Box, Typography, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import useGetCompanyFinancials from "../../hooks/useGetCompanyFinancials";
import { getPreferredFinancialData } from "../../utils/getPreferredFinancialData";

const CompanyFinancialsCard: React.FC = () => {
  const { isLoading, companyFinancials } = useGetCompanyFinancials();

  const preferredData = useMemo(
    () => getPreferredFinancialData(companyFinancials),
    [companyFinancials]
  );

  return (
    <Grid item xs={8}>
      <Card sx={{ padding: 2 }}>
        <Typography variant="h6">Financials</Typography>
        <Box height="400px" mt="1rem">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={preferredData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default CompanyFinancialsCard;
