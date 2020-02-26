import React from "react";
import "components/InterviewerListItem.scss";

const classnames = require('classnames');

// details about a selected interviewer from the list when making an appointment
export default function InterviewerListItem(props) {

  // adds a style class to the interviewer when selected
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

