// import Chart from "chart.js";
// import {Chart} from "chart.js"
import Chart from "chart.js/auto"
interface extendWindow extends Window{
  chart: Chart<"pie", number[], string>
}

declare let window: extendWindow
// let chart: any

// import { ChartType } from 'chart.js';

// const lineChartType: ChartType = "line";
// const pieChartType: ChartType = "pie";
const buildScales = (axes: string) => {
  const scales = {
    xAxes: [
      {
        ticks: {
          fontFamily: "Inter",
          fontColor: "#f6f8fa",
          fontSize: 12,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: "Inter",
          fontColor: "#f6f8fa",
          fontSize: 12,
        },
      },
    ],
  };

  return axes ? scales : null;
};

const buildLegend = (legend: boolean) => {
  const legendConfig = {
    position: "right",
    labels: {
      fontFamily: "Lato",
      fontColor: "#f6f8fa",
    },
  };
  return legend ? legendConfig : null;
};

const buildChart = (config: IChartConfig) => {
  // console.log({ config });
  console.log((window.chart))
 
  if(window.chart){
    window.chart.destroy()
  }
  const { canvasElement, chartType, labels, data, backgroundColor, axes, legend } =
    config;
  // if(window){

  window.chart = new Chart(canvasElement, {
      
    type: chartType,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
        },
      ],
    },
    
    options: {
      // scales: buildScales(axes),
      // legend: buildLegend(legend),
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend:{
          position: "bottom",
          labels:{
            boxWidth: 5,
            boxHeight: 5,
            padding: 12
          }
        },
        tooltip: {
          
          // fon
          // titleFont: "Inter",
          // bodyFont: "Inter",
          cornerRadius: 3,
        },
      }
    },
  });
  return window.chart
// }
};

export default buildChart;