import { useState } from "react";

// the logic behind switching between different windows
export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  // how we transition to different windows using the history
  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode])
    }
    setMode(newMode);
  }
  
  // when back is called checks the history to detemrine where to go back to
  const back = () => {
    if (history.length <= 1) {
      return
    } else {
      let backOne = history.slice(0, history.length - 1)
      setHistory([...backOne])
      setMode(history[history.length - 2])
    }
  }

  return { mode, transition, back };
}
