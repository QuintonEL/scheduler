export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  } else {
    const appointmentsMapped = filteredDays[0].appointments.map((appointment) => {
      return state.appointments[appointment]
    })
    return appointmentsMapped;
  }
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  } else {
    const interviewersMapped = filteredDays[0].interviewers.map((interviewer) => {
      return state.interviewers[interviewer]
    })
    console.log(interviewersMapped)
    return interviewersMapped;
  }
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const newInterview = {...interview, interviewer: {...state.interviewers[interview.interviewer] }} 
    return newInterview;
  }
}