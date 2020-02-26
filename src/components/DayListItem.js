import React from "react";
import "components/DayListItem.scss";

const classnames = require('classnames');

// content for a single day in the list of days
export default function DayListItem(props) {

  // function to decide what to show in the side bar depending on how many spots are left
  const formatSpots = function(props) {
    return (
      props.spots === 0 ? "no spots remaining"
      : (props.spots === 1 ? "1 spot remaining"
      : `${props.spots} spots remaining`)
    )
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
    data-testid="day"
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}