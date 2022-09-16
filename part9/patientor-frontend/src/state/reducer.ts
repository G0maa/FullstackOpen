import { State, useStateValue } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnoses) => ({ ...memo, [diagnoses.code]: diagnoses }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload,
  };
};

export const setPatient = (payload: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload,
  };
};

export const setDiagnosesList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload,
  };
};

// Need redux for that :)
export const addDiagnosis = (payload: Entry, id: string): Action => {
  const [{ patients }] = useStateValue();
  const patient = { ...patients[id] };

  if (!patient.entries) patient.entries = [];
  patient.entries.push(payload);

  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};
