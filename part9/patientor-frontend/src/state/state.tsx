import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

// Check how this looks after compilation
export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
