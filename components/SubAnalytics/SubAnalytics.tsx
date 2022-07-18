import { ChartTypeRegistry } from "chart.js";
import { Chart } from "chart.js/auto";
import React, { useCallback, useEffect, useState } from "react";
import buildChart from "../../helpers/buildChart";
import SubAnalytic from "../SubAnalytic/SubAnalytic";
import { ChartType } from "chart.js";
import { processOtherAnalytics } from "../../helpers/processOtherAnalytics";


const COLORS = ["#0047B3", "#0065FF", "#6BA6FF", "#96C0FF", "#E6F0FF"];

interface IProps {
  // date_analytics: IDateTimeAnalytics;
  other_analytics: IOtherAnalytics;
  isLoading: boolean;
}

// date_analytics,
const Subanalytics = ({
  other_analytics,
  isLoading,
}: IProps) => {
  const [doesBrowsersDataExist, setBrowsersDataExist] = useState(false);
  // const [doesReferralsExist, setReferralsExist] = useState(false);
  // const [doesDevicesExist, setDevicesExist] = useState(false);
  // const [doesCountriesExist, setCountriesExist] = useState(false);

  // const [browsersData, setB] = useState(b);

  const browsersChart = useCallback(() => {
    // if (!isLoading) {
    const canvasElement = document.getElementById(
      "browsersChart"
    ) as HTMLCanvasElement;
    //   console.log(canvasElement)

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
        buildChart(config, 0);
      }
      // } else setBrowsersDataExist(false);
    }
    // }
  }, [other_analytics]);

  const referralsChart = useCallback(() => {
    if (!isLoading) {
      const canvasElement = document.getElementById(
        "referralsChart"
      ) as HTMLCanvasElement;

      if (other_analytics.Referer) {
        const [labels, values] = processOtherAnalytics(
          other_analytics.Referer
        ) as [string[], number[]];

        if (labels && values) {
          // setDevicesExist(true);
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
          buildChart(config, 1);
        }
        //  else setReferralsExist(false);
      }
    }
  }, [other_analytics, isLoading]);

  const countriesChart = useCallback(() => {
    if (!isLoading) {
      const canvasElement = document.getElementById(
        "countriesChart"
      ) as HTMLCanvasElement;

      if (other_analytics.Country) {
        const [labels, values] = processOtherAnalytics(
          other_analytics.Country
        ) as [string[], number[]];

        if (labels && values) {
          // setCountriesExist(true);
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
          buildChart(config, 2);
        } 
        // else setCountriesExist(false);
      }
    }
  }, [other_analytics, isLoading]);
console.log(other_analytics)
  useEffect(() => {
    browsersChart();
    referralsChart();
    countriesChart();
    // console.log(browserChart)
  }, [browsersChart, referralsChart, countriesChart]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 my-3 ">
      <div className="md:col-start-1 md:col-span-4">
        <SubAnalytic
          title="Browsers"
          toolTipMessage="Top 5 Browsers that visited generated URL"
        >
          {
            JSON.stringify(other_analytics.Browser) !== '{}' ?

            <canvas
              id="browsersChart"
              
              className="mx-auto w-full aspect-square max-w-[400px]"
            ></canvas>
             :
            
            <p className="text-center text-sm italic">No data yet!</p>
          }
        </SubAnalytic>
      </div>

      <div className="md:col-start-5 md:col-span-4 ">
        <SubAnalytic
          title="Countries"
          toolTipMessage="Countries from which visitors accessed generated URL"
        >
          {
          JSON.stringify(other_analytics.Country) !== "{}" ? (
            <canvas
              id="countriesChart"
              className="mx-auto w-full aspect-square max-w-[400px]"
            ></canvas>
          ) : (
            <p className="text-center text-sm italic">No data yet!</p>
          )}
        </SubAnalytic>
      </div>

      <div className="md:col-start-9 md:col-span-4 ">
        <SubAnalytic
          title="Referrers"
          toolTipMessage="Sites visitors were before clicking generated URL"
        >
          {
          JSON.stringify(other_analytics.Referer) !== '{}' ? (
            <canvas id="referralsChart"  className="mx-auto w-full aspect-square max-w-[400px]"></canvas>
          ) : (
            <p className="text-center text-sm italic">No referrers yet!</p>
          )}
        </SubAnalytic>
      </div>
    </div>
  );
};

export default Subanalytics;
