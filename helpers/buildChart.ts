// import Chart from "chart.js";
// import {Chart} from "chart.js"
import { ChartType } from "chart.js";
import Chart from "chart.js/auto"
interface extendWindow extends Window{
  charts: Chart<"pie", number[], string>[]
  chart: Chart<"pie", number[], string>
}

declare let window: extendWindow 
let windowInitialized = false

// console.log(window.charts)
// let charts:  Chart<"pie", number[], string>[] = []
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

const buildChart = (config: IChartConfig,id: number) => {
  if(!windowInitialized) {
    window.charts = []
    windowInitialized = true
  }
  // console.log(window.charts)
  // if(window.charts[id]) window.charts[id].destroy()
  if(window.charts[id]) window.charts[id].destroy()
  // let a:{ chart:  Chart<ChartType, number[], string> | undefined} = {chart: undefined}
  // console.log({ config });
  // let chart: Chart<ChartType, number[], string> | undefined
  // console.log((window.chart))
 
  // if(chart){
    // a.chart && a.chart.destroy()
  // }
  const { canvasElement, chartType, labels, data, backgroundColor, axes, legend } = config;
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
      // scales: buildScales(axes),
      // legend: buildLegend(legend),
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend:{
          position: "bottom",
          labels:{
            boxWidth: 10,
            boxHeight: 9,
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
  return window.charts[id]
// }
};

export default buildChart;