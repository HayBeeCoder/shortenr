import { ChartTypeRegistry } from 'chart.js'
import React, { useCallback, useEffect, useState } from 'react'
import buildChart from '../../helpers/buildChart'
import SubAnalytic from '../SubAnalytic/SubAnalytic'
import {Chart} from 'chart.js/auto'
import { ChartType } from 'chart.js'
import { processOtherAnalytics } from '../../helpers/processOtherAnalytics'
import Skeleton from '../Skeleton/Skeleton'
let browserChart: any

const COLORS = [ "#0047B3","#0065FF","#6BA6FF","#96C0FF","#E6F0FF"  ]

const b = [
    {
        label:  "mozilla",
        value: 23,
        color: "#0047B3"
    },
    {
        label:  "chrome",
        value: 23,
        color: "#0065FF"
    },
    {
        label:  "sdsa",
        value: 23,
        color: "red"
    },
    {
        label:  "asd",
        value: 20,
        color: "green"
    },
    {
        label:  "brave",
        value: 23,
        color: "#6BA6FF"
    },
]

interface IProps{
    date_analytics: IDateTimeAnalytics
    other_analytics: IOtherAnalytics
    isLoading: boolean
}


const Subanalytics = ({date_analytics,other_analytics , isLoading}:IProps) => {
    const [doesBrowsersDataExist, setBrowsersDataExist] = useState(false)
    const [browsersData, setB] = useState(b)

    const browsersChart = useCallback(() => {
        const canvasElement = document.getElementById("browsersChart") as HTMLCanvasElement;
        console.log(canvasElement)
        // console.log(canvasElement);
        if(other_analytics.Browser){

            const [labels,values] = processOtherAnalytics(other_analytics.Browser) as [string[] , number[]]
            console.log(labels,values)
        
    
        setBrowsersDataExist(true);
        if (labels && values) {
          const backgroundColor = COLORS.slice(0,values.length + 1)
          console.log(values)
        //   const backgroundColor =color
        //   const borderColor = browsersData.map(lang => `${lang.color}`);
          const chartType: ChartType = 'doughnut' ;
          const axes = false;
          const legend = true;
          const config = {
            canvasElement,
            chartType,
            labels,
            data: values ,
            backgroundColor,
            // borderColor,
            axes,
            legend,
          }
          buildChart(config);
        };
        }
      }, [other_analytics]);

      useEffect(()=> {
        browsersChart() 
// console.log(browserChart)
        

      },[
        browsersChart
      ])

    return (
        <>

            <div className='col-start-4 col-span-6  row-start-4 row-span-3'>

                <SubAnalytic title='Views' toolTipMessage='Visits count within current month'>
                    <canvas id="starChart" width={250} height={250} />
                </SubAnalytic>
            </div>


            <div className='col-start-1 col-span-3  row-start-1 row-span-3'>
                <SubAnalytic title='Browsers' toolTipMessage='Top 5 Browsers that visited generated URL'>
                    {
                        isLoading ?
                        <Skeleton className='w-[300px] height=[250px]'/>
                        :
                    <canvas id="browsersChart" width={300} height={250} className=" mx-auto" />
                    }
                </SubAnalytic>
            </div>

            <div className='col-start-1 col-span-3  row-start-4 row-span-3' >
                <SubAnalytic title='Devices' toolTipMessage='Devices visitors used in accessing generated URL'>

                    <canvas id="devicesChart" width={300} height={250} className="bg-orange-300" />
                </SubAnalytic>
            </div>

            <div className='col-start-10 col-span-3  row-start-1 row-span-6'>
                <SubAnalytic title='Referrals' toolTipMessage='Sites visitors were before clicking generated URL'>
                    <canvas id="referralsChart" width={300} height={250} />
                </SubAnalytic>
            </div>

        </>
    )
}

export default Subanalytics