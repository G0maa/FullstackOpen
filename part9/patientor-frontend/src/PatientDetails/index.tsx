import { useParams } from "react-router-dom";
import { useStateValue, setPatient } from "../state";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, HealthCheckRating, Patient } from "../types";
import AddDiagnosisModal, { EntryFormFields } from "../AddDiagnosisModal";
import { Button } from "@material-ui/core";

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  console.log("Patients:", patients);
  const { id } = useParams<{ id: string }>();

  // This is impossible to happen,
  // maybe disable eslint rule for that line.
  if (!id) return <p>Undefinde ID...</p>;

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  // This error is passed down all the way to the form...
  // to show errors in that component.
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewDiagnosis = async (values: EntryFormFields) => {
    try {
      console.log("Payload", values);
      const { data: newDiagnosis } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const patient = { ...patients[id] };
      if (!patient.entries) patient.entries = [];
      patient.entries.push(newDiagnosis);

      dispatch(setPatient(patient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  let patient;
  if (id) patient = patients[id];

  if (!patient) return <p>Error: All patients have not been loaded.</p>;

  React.useEffect(() => {
    const fetchDetails = async () => {
      if (id && !patients[id].ssn) {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("Dada", data);
        // Redundant type.
        dispatch(setPatient(data));
      }
    };
    void fetchDetails();
  }, [id]);

  return (
    <div>
      <h3>
        {patient.name}, {patient.gender}
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occubation: {patient.occupation}</p>
      <div>
        <h3>Entries: </h3>
        {patient.entries?.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
      <AddDiagnosisModal
        modalOpen={modalOpen}
        onSubmit={submitNewDiagnosis}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Diagnosis
      </Button>
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue(); // This is not a good idea.
  const assertNever = (value: never): never => {
    throw new Error(`Entry of untyped type. :) ${JSON.stringify(value)}`);
  };

  let entryDetails = <p>None.</p>;
  switch (entry.type) {
    case "HealthCheck":
      entryDetails = (
        <div>
          <p>
            Health check rating: {HealthCheckRating[entry.healthCheckRating]}
          </p>
        </div>
      );
      break;
    case "Hospital":
      entryDetails = (
        <div>
          <h4>Discharge:</h4>
          <p>Date: {entry.discharge.date}</p>
          <p>Criteria: {entry.discharge.criteria}</p>
        </div>
      );
      break;
    case "OccupationalHealthcare":
      entryDetails = (
        <div>
          <p>Employer name: {entry.employerName}</p>
          <h4>SickLeave: </h4>
          <p>Start date: {entry.sickLeave?.startDate}</p>
          <p>End date: {entry.sickLeave?.endDate}</p>
        </div>
      );
      break;
    default:
      assertNever(entry);
  }

  return (
    <div style={{ border: "solid" }}>
      <p>{entry.date}</p>
      <p>Entry type: {entry.type}</p>
      <p>Diagnosed by: {entry.specialist}</p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}: {diagnoses[code].name}
          </li>
        ))}
        <div>
          <p>Per entry specific details:</p>
          {entryDetails}
        </div>
      </ul>
    </div>
  );
};

export default PatientDetails;
