import { Cell, Pie, PieChart } from "recharts";

import React from "react";
import Text from "../../components/shared/Text/Text";
import { Theme } from "../../theme";
import { useTheme } from "emotion-theming";
import useWindowSize from "../../hooks/useWindowSize";

export type ChartResults = {
  correct: { value: number; hideColor: boolean };
  incorrect: { value: number; hideColor: boolean };
  unanswered: { value: number; hideColor: boolean };
};

export interface ChartProps {
  size: number;
  results: ChartResults;
  label?: boolean;
}

export default function Chart({ size, results, label }: ChartProps) {
  const theme = useTheme<Theme>();
  const colors = {
    correct: theme.colors.primary,
    incorrect: theme.colors.secondary,
    unanswered: theme.colors.dark,
  };
  const data = Object.entries(results).map(([questionType, values]) => ({
    name: questionType,
    ...values,
    color: colors[questionType],
  }));

  const { deviceType } = useWindowSize();

  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={deviceType === "default" ? "50%" : "40%"}
        outerRadius="70%"
        label={label}
      >
        {data.map(({ name, color, hideColor = false }) => (
          <Cell key={name} fill={hideColor ? theme.colors.light : color} />
        ))}
      </Pie>
    </PieChart>
  );
}
