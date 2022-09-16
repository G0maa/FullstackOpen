// Entry has a dummy value for id field
import { HealthCheckRating } from "../types";
import { Formik, Field, Form } from "formik";
import {
  DiagnosisOption,
  DiagnosisSelection,
  HeatlhOption,
  SelectField,
  TextField,
} from "../components/FormField";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";
import { EntryFormFields } from ".";

interface Props {
  onSubmit: (values: EntryFormFields) => void;
  onCancel: () => void;
}

const healthCheckRating: HeatlhOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
];

const diagnosisType: DiagnosisOption[] = [
  { value: "OccupationalHealthcare", label: "Occubational Healthcare" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
];

const AddDiagnosisForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: "-1",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "",
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        discharge: { date: "", criteria: "" },
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const malformattedError = "Field is malformatted";
        // Had to use any becaue of the validation of discharge & sickLeave
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!Date.parse(values.date)) {
          errors.date = malformattedError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }

        if (values.type === "Hospital") {
          if (!values.discharge.date) {
            errors.discharge = { date: requiredError };
            errors.discharge.date = requiredError;
          }

          if (!values.discharge.criteria) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            errors.discharge = { ...errors.discharge, criteria: requiredError };
            errors.discharge.criteria = requiredError;
          }
        }

        if (values.type === "OccupationalHealthcare") {
          // I wonder if there's a better if condition...
          if (!values.sickLeave.endDate && values.sickLeave.startDate) {
            errors.sickLeave = {
              startDate: requiredError,
              endDate: requiredError,
            };
          }

          if (values.sickLeave.endDate && !values.sickLeave.startDate) {
            errors.sickLeave = {
              startDate: requiredError,
              endDate: requiredError,
            };
          }

          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        console.log("Errors", errors);
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log("Form values", values);
        switch (values.type) {
          case "HealthCheck":
            return (
              <Form className="form ui">
                <SelectField
                  label="Diagnosis Type"
                  name="type"
                  options={diagnosisType}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <SelectField
                  label="Health Check"
                  name="healthCheckRating"
                  options={healthCheckRating}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case "Hospital":
            return (
              <Form className="form ui">
                <SelectField
                  label="Diagnosis Type"
                  name="type"
                  options={diagnosisType}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
                <Field
                  label="Discrage Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case "OccupationalHealthcare":
            return (
              <Form className="form ui">
                <SelectField
                  label="Diagnosis Type"
                  name="type"
                  options={diagnosisType}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          default:
            return (
              <Form className="form ui">
                <SelectField
                  label="Diagnosis Type"
                  name="type"
                  options={diagnosisType}
                />
              </Form>
            );
        }
      }}
    </Formik>
  );
};

export default AddDiagnosisForm;
