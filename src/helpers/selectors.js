// uses a filter to find the selected day and gets an array of appointments for the day
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

// uses a filter to find the selected day and gets an array of interviewers for the day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  } else {
    const interviewersMapped = filteredDays[0].interviewers.map((interviewer) => {
      return state.interviewers[interviewer]
    })
    return interviewersMapped;
  }
};

// if there is a valid interview booking, gets the information for it in an object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const newInterview = {...interview, interviewer: {...state.interviewers[interview.interviewer] }} 
    return newInterview;
  }
}