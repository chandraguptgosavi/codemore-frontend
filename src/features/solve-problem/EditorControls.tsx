import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";

import ToastMessage from "components/ToastMessage";
import Color from "constants/colors";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import {
  resetRunCode,
  resetSubmission,
  runCode,
  setLanguage,
  submitProblem,
  toggleConsole,
} from "./solveProblemSlice";

const StyledEditorControlsContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
`;

function EditorControls() {
  const languages: { name: string; id: number }[] = [
    { name: "CPP", id: 54 },
    { name: "Java", id: 62 },
    { name: "JavaScript", id: 63 },
    { name: "Python", id: 71 },
  ];
  const {
    problem,
    language,
    isSubmissionPending,
    openConsole,
    submissionError,
    isCodeRunning,
    runCodeError,
  } = useReduxSelector((state) => state.solveProblem);
  const { _id } = useParams();
  const dispatch = useReduxDispatch();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIndex = +event.target.value;
    dispatch(
      setLanguage({ name: languages[selectedIndex].name, selectedIndex })
    );
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleConsole(event.target.checked));
  };

  const handleToastMessageClose = () => {
    if (runCodeError) dispatch(resetRunCode());
    if (submissionError) dispatch(resetSubmission());
  };

  const handleRun = (_: React.MouseEvent<HTMLButtonElement>) => {
    if (problem !== null) {
      dispatch(
        runCode({
          langID: languages[language.selectedIndex].id,
        })
      );
    }
  };

  const handleSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    if (_id !== undefined && problem !== null) {
      dispatch(
        submitProblem({
          _id,
          langID: languages[language.selectedIndex].id,
        })
      );
    }
  };

  return (
    <StyledEditorControlsContainer>
      <span>
        <TextField
          select
          size="small"
          color="secondary"
          value={language.selectedIndex}
          onChange={handleLanguageChange}
        >
          {languages.map((lang, index) => (
            <MenuItem key={lang.id} value={index}>
              {lang.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          sx={{ marginLeft: Unit.rem.SM, color: Color.SECONDARY }}
          control={
            <Switch
              color="secondary"
              checked={openConsole}
              onChange={handleSwitchChange}
            />
          }
          label="Console"
        />
      </span>
      <span>
        <Button
          variant="outlined"
          color="secondary"
          disabled={isCodeRunning || isSubmissionPending}
          onClick={handleRun}
          sx={{ marginRight: Unit.rem.SM }}
        >
          Run
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={isSubmissionPending || isCodeRunning}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </span>
      <ToastMessage
        show={runCodeError !== null || submissionError !== null}
        message={runCodeError !== null ? runCodeError : submissionError!!}
        onClose={handleToastMessageClose}
      />
    </StyledEditorControlsContainer>
  );
}

export default EditorControls;
