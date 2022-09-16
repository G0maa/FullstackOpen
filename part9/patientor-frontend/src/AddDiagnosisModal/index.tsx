import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { HealthCheckRating } from "../types";
import AddDiagnosisForm from "./AddDiagnosisForm";

// Thanks to Kalle Ilves for the tip :)
export interface EntryFormFields {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  type: string;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  discharge: { date: ""; criteria: "" };
  sickLeave: { startDate: ""; endDate: "" };
}

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormFields) => void;
  error?: string;
}

const AddDiagnosisModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a diagnosis</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddDiagnosisForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddDiagnosisModal;
