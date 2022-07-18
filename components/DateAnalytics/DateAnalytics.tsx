import { ChartType } from "chart.js";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import buildChart from "../../helpers/buildChart";
import SubAnalytic from "../SubAnalytic/SubAnalytic";

interface IProps {
  date_analytics: IDateTimeAnalytics;
  isLoading: boolean;
}

function getDayFromDate(date: string) {

  return parseInt(date.slice(date.length - 2));
}
function getMonthFromDate(date: string) {
  return parseInt(date.slice(6, 8));
}


//Each index of array signifies the month with January being 0 and December 11
//Each array entry represents the number of days in the corresponding index ( month )
// const MONTHS_NO_OF_DAYS = [31,28]

const DateAnalytics = ({ date_analytics, isLoading }: IProps) => {
  const [dayLabel, setDayLabels] = useState<string[] | null>(null)
  const [dayViewsCount,setDayViewsCount] = useState<number[] | null>(null)
  // const [month, setMonth] = useState<Array<{ label: string; value: number }> | null >(null);
  // const [currentMonth, setCurrentMonth] = useState<any+>();

  useEffect(() => {
    let day_count = 1
   
    // console.log(first_item)
    // console.log("The month is : " , length_of_month, " long.")
    // const month = getMonthFromDate(first_item.date)
    if (date_analytics.current_month && date_analytics.current_month[0]) {
      let {current_month} = date_analytics
      let last_item = date_analytics.current_month.at(-1)
      let first_item = date_analytics.current_month[0];
      let day_of_last_item = getDayFromDate(last_item?.date as string)  // a string would be returnUrl



      //using below daysInMonth method seems to not work for some dates, 
      //I gat my eyes on you though , we shall see
      //snaps finger
      const length_of_month = dayjs(first_item.date).daysInMonth()
      let dayLabelsArray = []
      // const array_for_month = Array.from({length: length_of_month}, () => ({label: `Day ${first_day++}`,value: 0}))
      // const days_of_month = new Array(length_of_month).fill(((item,index) => `Day ${index + 1}`)())
        while(day_count <= length_of_month){
          dayLabelsArray.push(`Day ${day_count++}`)


        }
      setDayLabels(dayLabelsArray)

      const views_of_month = new Array(day_of_last_item).fill(0)
      // const {current_month } = date_analytics
      for(let i = 0 ; i < current_month.length; i++){
        let item = current_month[i]
        const day = getDayFromDate(item.date)
        // console.log("the day is : " , day)
        // setDayViewsCount((dayViewsCount) => {
          // let a = dayViewsCount as number[]
          views_of_month[day - 1 ] = item.count__sum
          // return a
        // } )
      }
      setDayViewsCount(views_of_month)
      
    }
  }, [date_analytics]);

    useEffect(() => {
      if(dayLabel == null) return 
      
      if(date_analytics.current_month){
       
        

        // console.log( "The created array is therefore: ", month)
      }
    }, [ dayLabel , date_analytics])


    console.log("days:  " , dayLabel)
    console.log("views:  " , dayViewsCount)
  // const [doesCountriesExist ] = useState(false);
  // const [browsersData, setB] = useState(b);

  //   useEffect(() => {
  //     let first_day = 1
  //     // console.log(date_analytics)
  //     if(JSON.stringify(date_analytics) != "{}"  && date_analytics.current_month[0]){
  //       const {current_month} = date_analytics
  //       setCurrentMonth(current_month)
  //       // setCurrentMonth(current_month/)
  //       let number_of_days_in_current_month = dayjs(current_month[0].date).daysInMonth()
  //       console.log(number_of_days_in_current_month)
  //       setMonth(Array.from({length: number_of_days_in_current_month}, () => ({label: `Day ${first_day++}`,value: 0})))

  //     console.log(dayjs(current_month[0].date).month())
  //   }

  // },[date_analytics])
  // useEffect(()=> {
  //   console.log('Na your month data be this: ', month)
  //   function getDayFromDate(date: string){
  //     return parseInt(date.slice(date.length - 2))
  //   }
  //   if(JSON.stringify(date_analytics) != "{}"  && date_analytics.current_month[0]){
  //     const {current_month} = date_analytics
  //     // setCurrentMonth(current_month)
  //     const last_item_date = current_month.at(-1)?.date as string
  //     const last_day_link_was_visited= getDayFromDate(last_item_date)
  //     console.log("Last day of last date: ", last_day_link_was_visited)
  //     // console.log( 'last item date: ' , last_item?.date)

  //     // console.log('number of days in last date: ',dayjs(last_item?.date).day())
  //     for(let i = 0; i < last_day_link_was_visited; i++){
  //       // const {current_month} = date_analytics

  //       console.log(currentMonth)
  //       console.log(currentMonth[i])
  //       const {count__sum , date} = current_month[i]
  //       const day = getDayFromDate(date)
  //       if(day )

  //       //subtract 1 cos month array index is 1 less than the day it holds
  //       if(month){
  //         month[day - 1].value = count__sum
  //       }
  //     }

  //   }

  // },[date_analytics,month,currentMonth])
  const monthChart = useCallback(() => {
    // if (!isLoading) {
    const canvasElement = document.getElementById(
      "monthChart"
    ) as HTMLCanvasElement;
    //   console.log(canvasElement)
    if (dayLabel && dayViewsCount) {
      console.log("oguntade abass omowale ")
      // let does_real_values_exist = 
      // console.log(date_analytics.current_month);
      // const [labels, values] = processOtherAnalytics(
      //   date_analytics.
      // ) as [string[], number[]];

      // if (labels && values) {
      //   setBrowsersDataExist(true);
      //   const backgroundColor = COLORS.slice(0, values.length + 1);

        const chartType: ChartType = "line";
        // const axes = true;
      //   const legend = true;
        const config = {
          canvasElement,
          chartType,
          labels: dayLabel,
          data: dayViewsCount,
          backgroundColor: [],
          borderColor: 'green',
          axes: true,
          legend: false,
        };
        buildChart(config, 3);
      // } else setBrowsersDataExist(false);
    }
    // }
  }, [dayViewsCount]);

  useEffect(() => {
    monthChart();

    // return () => {
    //   second
    // }
  }, [monthChart]);

  return (
    <SubAnalytic
      title="Views"
      toolTipMessage="Visits count within current month"
      special
      should_flex
    >
      <div className="px-4 h-[350px] md:h-[300px]  overflow-x-scroll ">
        <canvas
          id="monthChart"
          className=" w-full md:h-full min-w-[500px]"
        ></canvas>
      </div>
    </SubAnalytic>
  );
};

export default DateAnalytics;
