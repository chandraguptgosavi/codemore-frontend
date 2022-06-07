import { Children, Fragment, ReactNode } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import StyledForm from "components/form/Form.styles";
import StyledFormItem from "components/form/FormItem.styles";
import Unit from "constants/units";
import useReduxSelector from "hooks/useReduxSelector";
import useReduxDispatch from "hooks/useReduxDispatch";
import { createProblem, resetContributionState } from "./contributionSlice";
import ToastMessage from "components/ToastMessage";
import CodemoreString from "constants/strings";

type FormInputs = {
  title: string;
  statement: string;
  input: string;
  output: string;
  sampleTestcaseCount: number;
  sampleTestcaseInput: string;
  sampleTestcaseOutput: string;
  testcaseCount: number;
  testcaseInput: string;
  testcaseOutput: string;
};

const yupSchema = yup.object().shape({
  title: yup.string().required(),
  statement: yup.string().required(),
  input: yup.string().required(),
  output: yup.string().required(),
  sampleTestcaseCount: yup.number().required().positive().integer(),
  sampleTestcaseInput: yup.string().required(),
  sampleTestcaseOutput: yup.string().required(),
  testcaseCount: yup.number().required().positive().integer(),
  testcaseInput: yup.string().required(),
  testcaseOutput: yup.string().required(),
});

function FormItems({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {Children.map(children, (child, _) => (
        <StyledFormItem>{child}</StyledFormItem>
      ))}
    </Fragment>
  );
}

function ContributionForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(yupSchema) });
  const { isLoading, error, response } = useReduxSelector(
    (state) => state.contribution
  );
  const dispatch = useReduxDispatch();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(
      createProblem({
        ...data,
        sampleTestCases: {
          count: data.sampleTestcaseCount,
          input: data.sampleTestcaseInput,
          output: data.sampleTestcaseOutput,
        },
        testCases: {
          count: data.testcaseCount,
          input: data.testcaseInput,
          output: data.testcaseOutput,
        },
      })
    );
  };

  return (
    <Fragment>
      <StyledForm>
        <FormItems>
          <Typography variant="h6" align="center">
            Contribute to our problem set!
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Problem title"
                placeholder={CodemoreString.problemTitlePlaceholer}
                error={!!errors.title}
                helperText={
                  !!errors.title && CodemoreString.fieldRequiredMessage
                }
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="statement"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Problem statement"
                placeholder={CodemoreString.problemStatementPlaholder}
                error={!!errors.statement}
                helperText={
                  !!errors.statement && CodemoreString.fieldRequiredMessage
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="input"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Input"
                placeholder={CodemoreString.problemInputPlaceholder}
                error={!!errors.input}
                helperText={
                  errors.input
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemInputHelper
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="output"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Output"
                placeholder={CodemoreString.problemOutputPlaceholder}
                error={!!errors.output}
                helperText={
                  errors.output
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemOutputHelper
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="sampleTestcaseCount"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Sample testcase count"
                placeholder={
                  CodemoreString.problemSampleTestcaseCountPlaceholder
                }
                error={!!errors.sampleTestcaseCount}
                helperText={
                  errors.sampleTestcaseCount
                    ? CodemoreString.validNumberMessage
                    : CodemoreString.problemSampleTestcaseCountHelper
                }
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="sampleTestcaseInput"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Sample testcase input"
                placeholder={
                  CodemoreString.problemSampleTestcaseInputPlaceholder
                }
                helperText={
                  errors.sampleTestcaseInput
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemSampleTestcaseInputHelper
                }
                error={!!errors.sampleTestcaseInput}
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="sampleTestcaseOutput"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Sample testcase output"
                placeholder={
                  CodemoreString.problemSampleTestcaseOutputPlaceholder
                }
                error={!!errors.sampleTestcaseOutput}
                helperText={
                  errors.sampleTestcaseOutput
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemSampleTestcaseOutputHelper
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="testcaseCount"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Main testcase count"
                placeholder={CodemoreString.problemTestcaseCountPlaceholder}
                error={!!errors.testcaseCount}
                helperText={
                  errors.testcaseCount
                    ? CodemoreString.validNumberMessage
                    : CodemoreString.problemTestcaseCountHelper
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="testcaseInput"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Main testcase input"
                placeholder={CodemoreString.problemTestcaseInputPlaceholder}
                error={!!errors.testcaseInput}
                helperText={
                  errors.testcaseInput
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemTestcaseInputHelper
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="testcaseOutput"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label="Main testcase output"
                placeholder={CodemoreString.problemTestcaseOutputPlaceholder}
                error={!!errors.testcaseOutput}
                helperText={
                  errors.testcaseOutput
                    ? CodemoreString.fieldRequiredMessage
                    : CodemoreString.problemTestcaseOutputHelperr
                }
                multiline
                fullWidth
                {...field}
              />
            )}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{ marginBottom: Unit.rem.SM }}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Submitting..." : "Submit Problem"}
          </Button>
        </FormItems>
      </StyledForm>
      <ToastMessage
        show={error !== null || response !== null}
        severity={error ? "error" : "success"}
        message={error ? error : response!!}
        onClose={() => dispatch(resetContributionState())}
      />
    </Fragment>
  );
}

export default ContributionForm;
