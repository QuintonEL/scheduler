import React from "react";
import "components/InterviewList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

// the list of interviewers including all their avatars and names and id's
export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className={props.value ? "interviewers__header text--light" : "interviewers__invalid text--light"}>Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}
