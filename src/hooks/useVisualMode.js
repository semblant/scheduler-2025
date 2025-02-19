import { useState } from "react";

/**
 * Takes in a 'mode of view', returns that mode.
 * @param {any} initial - initial mode to be passed in
 * @returns {object}
 *                - mode: the view mode to return
 *                - transition: function that performs view transition
 *                - back: function that performs a 'go to previous' mode transition
 */
 const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Switches current mode view to a different provided one.
   * @param {any} newMode - the mode to transition to
   * @param {boolean} replace - indicates if the current view should replace the previous view (in case of error)
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace ? setHistory((prev) => [...prev.slice(0, prev.length -1), newMode]) : setHistory((prevMode) => [...prevMode, newMode]); // if replace is true, set history to replace previous mode with current mode, otherwise set history to append current mode
  };

  /**
   * Switches current view to the previous view. If at initial view in history, stay in this mode
   */
  const back = () => {
    if (history.length > 1) setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
  }


  return { mode: history[history.length-1], transition, back };
};

export default useVisualMode;
