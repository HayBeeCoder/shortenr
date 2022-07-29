import { ChartType } from "chart.js";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { HOURS, HOUR_COUNTS } from "../../constants";
import buildChart from "../../helpers/buildChart";
import SubAnalytic from "../SubAnalytic/SubAnalytic";

interface IProps {
  date_analytics: IDateTimeAnalytics;
  isLoading: boolean;
  serverOffset: string
  // serverOffset: number
}

function getDayFromDate(date: string) {
  return parseInt(date.slice(date.length - 2));
}
function getMonthFromDate(date: string) {
  return parseInt(date.slice(6, 8));
}


// function convertMinuteToHour(minute)
//Each index of array signifies the month with January being 0 and December 11
//Each array entry represents the number of days in the corresponding index ( month )
// const MONTHS_NO_OF_DAYS = [31,28]

// The selected state inside DateAnalytics component
//day chart == 0
//week chart == 1
//month chart == 2

const DateAnalytics = ({ date_analytics, isLoading ,serverOffset}: IProps) => {
  console.log("in server: " , serverOffset)
  const [error, setError] = useState("");
  const [dayLabel, setDayLabels] = useState<string[] | null>(null);
  const [dayViewsCount, setDayViewsCount] = useState<number[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [hourLabel, setHourLabels] = useState(HOURS);
  const [hourCount, setHourCount] = useState<number[] | null>();

  const labels = [hourLabel, dayLabel];
  const counts = [hourCount, dayViewsCount];

  // const [month, setMonth] = useState<Array<{ label: string; value: number }> | null >(null);
  // const [currentMonth, setCurrentMonth] = useState<any+>();

  useEffect(() => {
    let day_count = 1;

    // console.log(first_item)
    // console.log("The month is : " , length_of_month, " long.")
    // const month = getMonthFromDate(first_item.date)
    if (date_analytics.current_month && date_analytics.current_month[0]) {
      let { current_month } = date_analytics;
      // console.log("Current Month: ", date_analytics.current_month);
      let last_item = current_month[current_month.length - 1];
      let first_item = date_analytics.current_month[0];

      //using below variable makes the chart stop at the last time a visitor visits the site
      // let day_of_last_item = getDayFromDate(last_item?.date as string); // a string would be returnUrl

      //using below variable makes the chart stop at the current day
      let today = new Date().getDate();
      // console.log("Today's date is: " , today)

      const length_of_month = dayjs(first_item.date).daysInMonth();
      // console.log(length_of_month);

      //using below daysInMonth method seems to not work for some dates,
      //I gat my eyes on you though , we shall see
      //snaps finger
      let dayLabelsArray = [];
      // const array_for_month = Array.from({length: length_of_month}, () => ({label: `Day ${first_day++}`,value: 0}))
      // const days_of_month = new Array(length_of_month).fill(((item,index) => `Day ${index + 1}`)())
      while (day_count <= length_of_month) {
        dayLabelsArray.push(`Day ${day_count++}`);
      }
      // console.log(dayLabelsArray);
      setDayLabels(dayLabelsArray);

      //
      // const number_of_view_days = today < day_of_last_item ? day_of_last_item : today
      const number_of_view_days = today;

      // const views_of_month = new Array(day_of_last_item).fill(0);
      const views_of_month = new Array(number_of_view_days).fill(0);
      // const {current_month } = date_analytics
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
      setDayViewsCount(views_of_month);
    }

    // console.log("Hours: ", date_analytics.today_by_hour);

    //hours logic
    //an array of objects containing particular hour ,
    console.log()
    const OFFSET_IN_MINUTES = new Date().getTimezoneOffset()
    const LOCAL_OFFSET = (OFFSET_IN_MINUTES / 60)
    const SERVER_OFFSET = parseInt(serverOffset)
    const DIFFERENCE_BETWEEN_OFFSET = LOCAL_OFFSET + SERVER_OFFSET
    const currentHour = dayjs().hour() ;
    
    console.log("local offset" , LOCAL_OFFSET)
    console.log("server offset: " , SERVER_OFFSET)
    // console.log("time zone in hour: " , LOCAL_OFFSET)
    // console.log("users current hour: ", dayjs().hour());
    // console.log('timezone offset: ' , OFFSET_IN_MINUTES)
    // console.log("Current Hour: " , currentHour)
    if (date_analytics.today_by_hour && date_analytics.today_by_hour[0]) {
      let { today_by_hour } = date_analytics;

      const views_of_day = new Array(currentHour + DIFFERENCE_BETWEEN_OFFSET).fill(0);

      for (let i = 0; i < today_by_hour.length; i++) {
        const item = today_by_hour[i];
        // let real__hour = item.time__hour - DIFFERENCE_BETWEEN_OFFSET
      // if(item.time__hour + 1 == 24){
      //   views_of_day[0] 
      // }

        views_of_day[item.time__hour + 1] = item.count__sum;
      }
      // console.log("views of day: " , views_of_day)
      setHourCount(views_of_day);
    }

    //days of week login
  }, [date_analytics, selected]);

  // console.log("days:  ", dayLabel);
  // console.log("views:  ", dayViewsCount);

  const monthChart = useCallback(() => {
    const canvasElement = document.getElementById(
      "dateChart"
    ) as HTMLCanvasElement;
    if (dayLabel && dayViewsCount) {
      console.log("hour count: ", hourCount);
      console.log("hout label count", hourLabel);

      console.log("day count: ", dayViewsCount);
      console.log("day label count: ", dayLabel);
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

    // return () => {
    //   second
    // }
  }, [monthChart, date_analytics]);

  return (
    <>
      <div>{error}</div>
      <SubAnalytic
        title="Current Month Views"
        // toolTipMessage="Visits count within current month"
        special
        should_flex
        data_exists={JSON.stringify(date_analytics.current_month) !== "[]"}
        selected={selected}
        setSelected={setSelected}
      >
        <div className="px-4  h-[300px] md:h-[250px]  ">
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
