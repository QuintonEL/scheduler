import React, { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData() {

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

   useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3])
    .then((all) => {
      setState(prev => ({ day: state.day, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
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
        setState({
          ...state,
          appointments
        })
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
        setState({
          ...state,
          appointments
        })
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