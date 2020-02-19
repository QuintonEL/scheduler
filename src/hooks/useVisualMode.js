import { useState } from "react";


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  
  function transition(newMode, replace) {
    
  }
  
  function back() {
    if (history.length <= 1) {
      return
    }
  }

  return { mode, transition, back };
}
