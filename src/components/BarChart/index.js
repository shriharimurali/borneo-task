import React, { useContext, useState } from "react";
import ReactECharts from "echarts-for-react";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import moment from "moment";

import DateRange from "../DateRange";

import { AuthContext } from "../../context";

const BarChart = (_) => {
  const { data } = useContext(AuthContext);
  const [filterApplied, setFilterApplied] = useState(false);
  const [dates, setDates] = useState({
    fromDate: null,
    toDate: null,
  });

  const handleFromChange = (e) => {
    const newDates = {
      fromDate: new Date(e),
      toDate: dates.toDate,
    };
    setFilterApplied(true);
    setDates(newDates);
  };

  const handleToChange = (e) => {
    const newDates = {
      fromDate: dates.fromDate,
      toDate: new Date(e),
    };
    setFilterApplied(true);
    setDates(newDates);
  };

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

  const filteredData = [];

  const xAxisData = !filterApplied
    ? reduced.map((item) => item.date)
    : filteredData.map((item) => item.date);

  const series = {
    data: !filterApplied
      ? reduced.map((itemI) => itemI.expense)
      : filteredData.map((itemI) => itemI.expense),
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
      <DateRange
        fromDate={dates.fromDate}
        toDate={dates.toDate}
        handleFromChange={handleFromChange}
        handleToChange={handleToChange}
      />
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
