// import Chart from "chart.js";
// import {Chart} from "chart.js"
import { ChartType, Scale, ScaleChartOptions, ScaleOptions } from "chart.js";
import Chart from "chart.js/auto";
interface extendWindow extends Window {
  charts: Chart<"pie" | "line", number[], string>[];
  chart: Chart<"pie", number[], string>;
}

declare let window: extendWindow;
let windowInitialized = false;

// console.log(window.charts)
// let charts:  Chart<"pie", number[], string>[] = []
// let chart: any

// import { ChartType } from 'chart.js';

// const lineChartType: ChartType = "line";
// const pieChartType: ChartType = "pie";


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

const buildScales = (axes: boolean) => {
  const scales = {
    x:   {
        ticks: {
          fontFamily: "Lato",
          fontColor: "orange",
          fontSize: 12,
          color: 'red',
        },
        grid: {
          // borderColor: 'blue'
        }
      },
    
    y: {
        ticks: {
          fontFamily: "Lato",
          fontColor: "#f6f8fa",
          fontSize: 12,
          stepSize: 1
        },
      },
    
  };

  return axes ? scales : null
};

const buildChart = (config: IChartConfig, id: number) => {
  if (!windowInitialized) {
    window.charts = [];
    windowInitialized = true;
  }
  // console.log(window.charts)
  // if(window.charts[id]) window.charts[id].destroy()
  if (window.charts[id]) window.charts[id].destroy();

  const {
    canvasElement,
    chartType,
    labels,
    data,
    backgroundColor,
    axes,
    legend,
  } = config;
  // if(window){

  window.charts[id] = new Chart(canvasElement, {
    // window.charts[id] = new Chart(canvasElement, {

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
      elements:{
        point: {
          backgroundColor: 'orange',
          radius: 2
        },
        line: {
          borderColor: 'blue',
          borderWidth: 5
        }
      },
      scales: buildScales(axes),
      legend: buildLegend(legend),
      maintainAspectRatio:  chartType == "line" ? false : true ,
      responsive: chartType == "line" ? true : false ,
      plugins: {
        
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            boxHeight: 9,
            padding: 12,
          },
        },
        tooltip: {
          // fon
          // titleFont: "Lato",
          // bodyFont: "Lato",
          cornerRadius: 3,
        },
      },
    },
  });
  return window.charts[id];
  // }
};

export default buildChart;
