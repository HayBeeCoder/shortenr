import { ChartType } from "chart.js";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { HOURS } from "../../constants";
import buildChart from "../../helpers/buildChart";
import SubAnalytic from "../SubAnalytic/SubAnalytic";

interface IProps {
  date_analytics: IDateTimeAnalytics;
  isLoading: boolean;
  serverOffset: string;
}

function getDayFromDate(date: string) {
  return parseInt(date.slice(date.length - 2));
}

const DateAnalytics = ({ date_analytics, isLoading, serverOffset }: IProps) => {
  const [error, setError] = useState("");
  const [dayLabel, setDayLabels] = useState<string[] | null>(null);
  const [dayViewsCount, setDayViewsCount] = useState<number[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [hourLabel, setHourLabels] = useState(HOURS);
  const [hourCount, setHourCount] = useState<number[] | null>();

  const labels = [hourLabel, dayLabel];
  const counts = [hourCount, dayViewsCount];

  const OFFSET_IN_MINUTES = new Date().getTimezoneOffset();
  const LOCAL_OFFSET = OFFSET_IN_MINUTES / 60;
  const SERVER_OFFSET = parseInt(serverOffset);
  const DIFFERENCE_BETWEEN_OFFSET = LOCAL_OFFSET + SERVER_OFFSET;
  const currentHour = dayjs().hour();

  useEffect(() => {
    let day_count = 1;

    if (date_analytics.current_month ) {
      let { current_month } = date_analytics;
      // let last_item = current_month[current_month.length - 1];
      let first_item = current_month[0];
      let newHour = currentHour + DIFFERENCE_BETWEEN_OFFSET;
      //using below variable makes the chart stop at the last time a visitor visits the site
      // let day_of_last_item = getDayFromDate(last_item?.date as string); // a string would be returnUrl

      //using below variable makes the chart stop at the current day

      let today = new Date().getDate();
      // console.log("today is: " , today)
      // console.log("todate is: " , new Date())
      if (newHour < 0) today = today - 1;
      else if (newHour >= 24) today = today + 1;

      const length_of_month = dayjs(first_item.date).daysInMonth();
      //using below daysInMonth method seems to not work for some dates,
      //I gat my eyes on you though , we shall see
      //snaps finger
      let dayLabelsArray = [];

      while (day_count <= length_of_month) {
        dayLabelsArray.push(`Day ${day_count++}`);
      }

      setDayLabels(dayLabelsArray);

      // const number_of_view_days = today;

      // const views_of_month = new Array(day_of_last_item).fill(0);
      // console.log("immediate today: " , today)
      const views_of_month = new Array(today).fill(0);
      // console.log("month length: " , views_of_month.length)
      // const {current_month } = date_analytics
      if(current_month.length != 0) {

        for (let i = 0; i < current_month.length; i++) {
          let item = current_month[i];
          const day = getDayFromDate(item.date);
          // console.log("the day is : " , day)
          // setDayViewsCount((dayViewsCount) => {
            // let a = dayViewsCount as number[]
            views_of_month[day - 1] = item.count__sum;
            // return a
            // } )
          }
        }
          setDayViewsCount(views_of_month);
    }

    // console.log("Hours: ", date_analytics.today_by_hour);

    //hours logic
    //an array of objects containing particular hour ,

    //all these need consideration when there is a need  to display per hour/per day views based on users' local timezone
    // rather than the one in the server( currently in use )
    // const OFFSET_IN_MINUTES = new Date().getTimezoneOffset();
    // const LOCAL_OFFSET = OFFSET_IN_MINUTES / 60;
    // const SERVER_OFFSET = parseInt(serverOffset);
    // const DIFFERENCE_BETWEEN_OFFSET = LOCAL_OFFSET + SERVER_OFFSET;
    // const currentHour = dayjs().hour();

    // console.log("Local offset: " , LOCAL_OFFSET)
    // console.log("server offset: " , SERVER_OFFSET)
    // console.log("difference: " , DIFFERENCE_BETWEEN_OFFSET)
    // console.log("local offset" , LOCAL_OFFSET)
    // console.log("server offset: " , SERVER_OFFSET)
    // console.log("time zone in hour: " , LOCAL_OFFSET)
    // console.log("users current hour: ", dayjs().hour());
    // console.log('timezone offset: ' , OFFSET_IN_MINUTES)
    // console.log("Current Hour: " , currentHour)
    // console.log(date)
    // console.log("error in dataanalytics: ", date_analytics);
    // console.log("date_analytics" , date_analytics)
    if (date_analytics.today_by_hour) {
      let { today_by_hour } = date_analytics;
      // console.log(" current hour: " , currentHour)
      let newHour = currentHour + DIFFERENCE_BETWEEN_OFFSET;
      if (newHour < 0) newHour = 24 + newHour;
      if (newHour >= 24) newHour = newHour - 24;
       console.log("diff: " , DIFFERENCE_BETWEEN_OFFSET)   
       console.log("current: " , currentHour )
      // console.log("new hour: " , newHour)
      const views_of_day = new Array(newHour).fill(0);
      // console.log(newHour);
      // console.log("views array at initial creation :  ", views_of_day);
      // console.log("today by hour", today_by_hour);

      if (today_by_hour.length != 0) {
        for (let i = 0; i < today_by_hour.length; i++) {
          const item = today_by_hour[i];
          views_of_day[item.time__hour] = item.count__sum;
        }
      }

      setHourCount(views_of_day);
    }

    //days of week login
  }, [date_analytics, selected]);

  // console.log("days:  ", dayLabel);
  // console.log("views:  ", dayViewsCount);
  // console.log("Day value : " , dayViewsCount )
  // console.log("Day label : " , dayLabel )

  const monthChart = useCallback(() => {
    const canvasElement = document.getElementById(
      "dateChart"
    ) as HTMLCanvasElement;
    if (dayLabel && dayViewsCount) {
      // console.log("day label count: ", dayLabel);
      const chartType: ChartType = "line";

      const config: IChartConfig = {
        canvasElement,
        chartType,
        // labels: dayLabel,
        // data: dayViewsCount,
        labels: labels[selected] as string[],
        data: counts[selected] as number[],
        backgroundColor: [],
        axes: true,
        legend: false,
        selectedForDateTimeAnalytics: selected,
      };
      buildChart(config, 5);
      // } else setBrowsersDataExist(false);
    }
    // }
  }, [dayLabel, dayViewsCount, date_analytics]);

  useEffect(() => {
    try {
      monthChart();
    } catch (e: any) {
      setError(e);
    }
  }, [monthChart, date_analytics]);
  // console.log(hourLabel);
  // console.log(hourCount);
  return (
    <>
      {/* <div>{error}</div> */}
      <SubAnalytic
        title="Current Month Views"
        // toolTipMessage="Visits count within current month"
        special
        should_flex
        data_exists={JSON.stringify(date_analytics.current_month) !== "[]"}
        selected={selected}
        setSelected={setSelected}
      >
        <div className="px-4  h-[350px] md:h-[250px]  ">
          {JSON.stringify(date_analytics.current_month) !== "[]" ? (
            <canvas id="dateChart" className=" md:h-full w-full"></canvas>
          ) : (
            <p className="text-center text-sm italic">No data yet!</p>
          )}
        </div>
      </SubAnalytic>
    </>
  );
};

export default DateAnalytics;
