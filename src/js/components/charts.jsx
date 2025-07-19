import React, { useEffect, useRef } from "react";
import Chart from "react-apexcharts";

export const SEOScoreTrendChart = ({ data }) => {
  const chartRef = useRef(null);

  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "datetime",
      categories: data.dates,
      labels: {
        datetimeUTC: false,
        format: "MMM dd",
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (value) => Math.round(value),
      },
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy",
      },
    },
    colors: ["#3B82F6"],
  };

  const series = [
    {
      name: "SEO Score",
      data: data.scores,
    },
  ];

  return (
    <div className="px-4 pb-4">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export const IssuesBreakdownChart = ({ data }) => {
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Content", "Technical", "Performance"],
    colors: ["#22c55d", "#2463eb", "#f59e0c"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Issues",
              color: "#6B7280",
              formatter: () => data.content + data.technical + data.performance,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [data.content, data.technical, data.performance];

  return (
    <div className="px-4 pb-4">
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};
