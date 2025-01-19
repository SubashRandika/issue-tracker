"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -40,
          bottom: -5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="value" barSize={60} style={{ fill: "var(--accent-9)" }} />
        <XAxis dataKey="label" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssueChart;
