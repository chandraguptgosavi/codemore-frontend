import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import Color from "constants/colors";
import Screen from "constants/screens";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import styled from "styled-components";
import ToastMessage from "components/ToastMessage";
import { resetSubmission, submitProblem } from "./solveProblemSlice";
import { useParams } from "react-router-dom";

const StyledCodeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${Unit.rem.MD};
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  background-color: ${Color.LIGHT};

  @media (min-width: ${Screen.LG}) {
    width: 65%;
    height: 100%;
    min-height: auto;
  }
`;

const StyledCodeControlsContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

type StyledConsoleContainerProps = {
  open: boolean;
};

const StyledConsoleContainer = styled.div<StyledConsoleContainerProps>`
  width: 100%;
  max-height: 0;
  height: 180px;
  transition: max-height 0.2s ease-in-out;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${Color.SECONDARY};

  ${({ open }) => open && `max-height: 200px;`}
`;

const StyledConsoleOutputContainer = styled.div`
  overflow: auto;
  margin: ${Unit.rem.XS};
  padding: ${Unit.rem.MD};
  border: 1px solid black;
  height: 138px;
  border-radius: ${Unit.rem.XS};
  background-color: ${Color.LIGHT};
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

function Code() {
  const languages: { name: string; id: number }[] = [
    { name: "CPP", id: 54 },
    { name: "Java", id: 62 },
    { name: "JavaScript", id: 63 },
    { name: "Python", id: 71 },
  ];

  const [srcCode, setSrcCode] = useState<string | undefined>("");
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState<number>(0);
  const [openConsole, setOpenConsole] = useState(false);
  const { isSubmissionPending, error, submissionResponse } = useReduxSelector(
    (state) => state.solveProblem
  );
  const { _id } = useParams();
  const dispatch = useReduxDispatch();

  const handleEditorChange = (value: string | undefined, _: unknown) => {
    setSrcCode(value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguageIndex(+event.target.value);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenConsole(event.target.checked);
  };

  const onSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    if (_id !== undefined && srcCode !== undefined) {
      dispatch(
        submitProblem({
          _id,
          srcCode,
          langID: languages[selectedLanguageIndex].id,
        })
      );
    }
    if (!openConsole) setOpenConsole(true);
  };

  return (
    <StyledCodeContainer>
      <Editor
        height="92%"
        width="100%"
        language={languages[selectedLanguageIndex].name.toLowerCase()}
        defaultValue="// write your code"
        onChange={handleEditorChange}
      />
      <StyledConsoleContainer open={openConsole}>
        <StyledConsoleOutputContainer>
          {isSubmissionPending ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="92.5%"
              height="70%"
              sx={{position: 'absolute', top: "50%", left: "50%", transform:'translate(-50%,-50%)'}}
            />
          ) : (
            <div>
              {submissionResponse ? (
                <Typography>{submissionResponse.status.description}</Typography>
              ) : (
                <Typography align="center" variant="h6">
                  Submit to see results!
                </Typography>
              )}
            </div>
          )}
        </StyledConsoleOutputContainer>
      </StyledConsoleContainer>
      <StyledCodeControlsContainer>
        <span>
          <TextField
            select
            size="small"
            color="secondary"
            value={selectedLanguageIndex}
            onChange={handleLanguageChange}
          >
            {languages.map((language, index) => (
              <MenuItem key={language.id} value={index}>
                {language.name}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            sx={{ marginLeft: Unit.rem.MD, color: Color.SECONDARY }}
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
        <Button
          variant="contained"
          color="secondary"
          disabled={isSubmissionPending}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </StyledCodeControlsContainer>
      <ToastMessage
        show={error !== null}
        message={error!!}
        onClose={() => dispatch(resetSubmission())}
      />
    </StyledCodeContainer>
  );
}

export default Code;
