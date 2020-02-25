export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";
export const UPDATE_SPOTS = "UPDATE_SPOTS";


export default function reducer(state, action) {

  const spotsRemaining = function () {
    let spots = 0;
    for (let day in state.days) {
      //select the day we currently have selected on screen from the state
      if ((state.days[day].name === state.day)) {
        //loop through all appointments for that day
        for (let id of state.days[day].appointments) {
          //check if the appointment is null
          if (state.appointments[id].interview === null) {
            spots++
          }
        }
      }
    }
    return state.days.map((day) => {
      if (day.name !== state.day) {
        // if day is not the one we want - return same things
        return day
      }
      // Otherwise, this is the one we want - return an updated value
      return {
        ...day, spots
      }
    })
  }

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_APPLICATION_DATA:
      return { day: state.day, 
        days: action.value[0].data, 
        appointments: action.value[1].data, 
        interviewers: action.value[2].data }
    case SET_INTERVIEW: {
      return { ...state, appointments: action.interview, days: spotsRemaining() }
    }
    case CANCEL_INTERVIEW: {
      return { ...state, appointments: action.interview, days: spotsRemaining()}
    }
    case UPDATE_SPOTS: {
      return { ...state, days: spotsRemaining() }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}