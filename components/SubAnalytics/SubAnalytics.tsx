import { ChartTypeRegistry } from "chart.js";
import React, { useCallback, useEffect, useState } from "react";
import buildChart from "../../helpers/buildChart";
import SubAnalytic from "../SubAnalytic/SubAnalytic";
import { Chart } from "chart.js/auto";
import { ChartType } from "chart.js";
import { processOtherAnalytics } from "../../helpers/processOtherAnalytics";
import Skeleton from "../Skeleton/Skeleton";
let browserChart: any;

const COLORS = ["#0047B3", "#0065FF", "#6BA6FF", "#96C0FF", "#E6F0FF"];

const b = [
  {
    label: "mozilla",
    value: 23,
    color: "#0047B3",
  },
  {
    label: "chrome",
    value: 23,
    color: "#0065FF",
  },
  {
    label: "sdsa",
    value: 23,
    color: "red",
  },
  {
    label: "asd",
    value: 20,
    color: "green",
  },
  {
    label: "brave",
    value: 23,
    color: "#6BA6FF",
  },
];

interface IProps {
  date_analytics: IDateTimeAnalytics;
  other_analytics: IOtherAnalytics;
  isLoading: boolean;
}

const Subanalytics = ({
  date_analytics,
  other_analytics,
  isLoading,
}: IProps) => {
  const [doesBrowsersDataExist, setBrowsersDataExist] = useState(false);
  const [browsersData, setB] = useState(b);

  const browsersChart = useCallback(() => {
    if (!isLoading) {
      const canvasElement = document.getElementById(
        "browsersChart"
      ) as HTMLCanvasElement;

      if (other_analytics.Browser) {
        const [labels, values] = processOtherAnalytics(
          other_analytics.Browser
        ) as [string[], number[]];

        if (labels && values) {
          setBrowsersDataExist(true);
          const backgroundColor = COLORS.slice(0, values.length + 1);

          const chartType: ChartType = "doughnut";
          const axes = false;
          const legend = true;
          const config = {
            canvasElement,
            chartType,
            labels,
            data: values,
            backgroundColor,
            // borderColor,
            axes,
            legend,
          };
          buildChart(config);
        } else setBrowsersDataExist(false);
      }
    }
  }, [other_analytics,isLoading]);

  useEffect(() => {
    browsersChart();
    // console.log(browserChart)
  }, [browsersChart]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 my-3 ">
      <div className="md:col-start-1 md:col-span-4">
        <SubAnalytic
          title="Browsers"
          toolTipMessage="Top 5 Browsers that visited generated URL"
        >
          {isLoading ? (
            <Skeleton className="w-[300px] height=[250px]" />
          ) : doesBrowsersDataExist ? (
            <canvas
              id="browsersChart"
              width={300}
              height={250}
              className=" mx-auto"
            ></canvas>
          ) : (
            <p className="text-center mt-5 italic">No data exists yet!</p>
          )}
        </SubAnalytic>
      </div>

      <div className="md:col-start-5 md:col-span-4 ">
        <SubAnalytic
          title="Devices"
          toolTipMessage="Devices visitors used in accessing generated URL"
        >
          <canvas id="devicesChart" width={300} height={250} className="" >
            </canvas>
        </SubAnalytic>
      </div>

      <div className="md:col-start-9 md:col-span-4 ">
        <SubAnalytic
          title="Referrals"
          toolTipMessage="Sites visitors were before clicking generated URL"
        >
          <canvas id="referralsChart" width={300} height={250} >
            </canvas>
        </SubAnalytic>
      </div>
    </div>
  );
};

export default Subanalytics;
