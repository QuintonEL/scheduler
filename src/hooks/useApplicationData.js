import { useEffect, useReducer } from "react";
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS,
  CANCEL_INTERVIEW,
} from "reducers/application";

// all the axios requests to the server are made here to get all information 
export default function useApplicationData() {
  
  const setDay = day => dispatch({ type: SET_DAY, value: day })
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // tell react to make the axios requests after render
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3])
    .then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    });
  }, []);

  // books a new interview and adds it into the appointments for the day
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // sends the new data to the server
    return Promise.resolve(axios.put(`/api/appointments/${id}`, appointment)
      .then( () =>
        dispatch({ type: SET_INTERVIEW, interview: appointments })
      )
      .then ( () =>
        dispatch({ type: UPDATE_SPOTS })
      )
    )
  }

  // sets the interview to null after canceling
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // deletes the interview from the server
    return Promise.resolve(axios.delete(`/api/appointments/${id}`)
      .then( () =>
        dispatch({ type: CANCEL_INTERVIEW, interview: appointments })
      )
      .then ( () =>
        dispatch({ type: UPDATE_SPOTS })
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