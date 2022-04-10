import React, { useContext } from "react";
import ReactECharts from "echarts-for-react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import { AuthContext } from "../../context";

const PieChart = (_) => {
  const { data } = useContext(AuthContext);

  const reduced = data.reduce(function (allItems, item) {
    if (
      allItems.some(function (e) {
        return e.name === item.expenseType;
      })
    ) {
      allItems.filter(function (e) {
        return e.name === item.expenseType;
      })[0].value += +item.expense;
    } else {
      allItems.push({
        value: +item.expense,
        name: item.expenseType,
      });
    }
    return allItems;
  }, []);

  const config = {
    title: {
      text: "Spends by Type",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "80%",
        data: reduced,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: 50 }}>
      <ReactECharts
        option={config}
        lazyUpdate
        notMerge={true}
        echarts={echarts}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export default PieChart;
