import { useEffect, useReducer } from "react";
const axios = require('axios');

export default function useApplicationData() {

  
  // const setDay = day => setState(prev => ({ ...prev, day }));
  const setDay = day => dispatch({ type: SET_DAY, value: day })
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const CANCEL_INTERVIEW = "CANCEL_INTERVIEW"

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:
        return { day: state.day, 
          days: action.value[0].data, 
          appointments: action.value[1].data, 
          interviewers: action.value[2].data }
      case SET_INTERVIEW: {

        return { ...state, appointments: action.interview }
      }
      case CANCEL_INTERVIEW: {
        return { ...state, appointments: action.interview }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  

   useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3])
    .then((all) => {
      // setState(prev => ({ day: state.day, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      dispatch({ type: SET_APPLICATION_DATA, value: all }); //days, appointments, interviewers });

    });
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return Promise.resolve(axios.put(`/api/appointments/${id}`, appointment)
      .then( () =>
        dispatch({ type: SET_INTERVIEW, interview: appointments })
        // setState({
        //   ...state,
        //   appointments
        // })
      )
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(axios.delete(`/api/appointments/${id}`)
      .then( () =>
        dispatch({ type: CANCEL_INTERVIEW, interview: appointments })
        // setState({
        //   ...state,
        //   appointments
        // })
      )
    )
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}