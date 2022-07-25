import React from 'react'
import ListItem from '../ListItem/ListItem'
import SubAnalytic from '../SubAnalytic/SubAnalytic'

interface IProps{
    referrers_analytics: IReferrer
}

const Referrers = ({referrers_analytics} : IProps) => {
  const total = Object.values(referrers_analytics).reduce((accumulator,value) => accumulator + value,0)
  return (
    <SubAnalytic 
        title='Referrers'
        toolTipMessage='Sites from which visitors visited shortened URL'

    >
        <ul>
            {
              JSON.stringify(referrers_analytics) != '{}' ?
              Object.entries(referrers_analytics).map((referrer,index) => (

                <ListItem key={index}>{referrer[0]}</ListItem>
              )):
              <p>
                No referrers yet!
              </p>
            }
        </ul>

    </SubAnalytic>

  )
}

export default Referrers