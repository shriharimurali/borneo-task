import React, { useContext } from "react";
import ReactECharts from "echarts-for-react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import { AuthContext } from "../../context";

const BarChart = (_) => {
  const { data } = useContext(AuthContext);

  const reduced = data.reduce(function (allDates, date) {
    if (
      allDates.some(function (e) {
        return e.date === date.date;
      })
    ) {
      allDates.filter(function (e) {
        return e.date === date.date;
      })[0].expense += +date.expense;
    } else {
      allDates.push({
        date: date.date,
        expense: +date.expense,
      });
    }
    return allDates;
  }, []);

  const xAxisData = reduced.map((item) => item.date);

  const series = {
    data: reduced.map((itemI) => itemI.expense),
    type: "bar",
    showBackground: true,
    backgroundStyle: {
      color: "rgba(180, 180, 180, 0.2)",
    },
  };

  const config = {
    title: {
      text: "Spends by Date",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "slider",
      },
      {
        type: "inside",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series,
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

export default BarChart;
