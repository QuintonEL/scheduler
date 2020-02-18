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
}