import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  console.log('daysssss',props.days)
  const Days = props.days.map((day) => {
    return (
      <DayListItem 
        id={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    )
  })
  
  return (
    <ul>
      {Days}
    </ul>
  )
}