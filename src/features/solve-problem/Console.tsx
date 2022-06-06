import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import Color from "constants/colors";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import { setConsoleTabIndex, setUserInput } from "./solveProblemSlice";
import { judgeOuptut } from "./utils";

type StyledConsoleProps = {
  open: boolean;
};

const StyledConsole = styled.div<StyledConsoleProps>`
  width: 100%;
  max-height: 0;
  height: 200px;
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

const StyledConsoleContainer = styled.div`
  overflow: hidden;
  margin: ${Unit.rem.XS};
  border: 1px solid black;
  height: 190px;
  border-radius: ${Unit.rem.XS};
  background-color: ${Color.LIGHT};
`;

const StyledTabPanel = styled.div`
  height: 142px;
  position: relative;
  overflow: auto;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <StyledTabPanel
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </StyledTabPanel>
  );
}

function Console() {
  const {
    problem,
    openConsole,
    consoleTabIndex,
    isSubmissionPending,
    submissionResponse,
    isCodeRunning,
    runCodeResponse,
    userInput,
  } = useReduxSelector((state) => state.solveProblem);
  const dispatch = useReduxDispatch();

  const handleTabsChange = (_: React.SyntheticEvent, newValue: number) => {
    dispatch(setConsoleTabIndex(newValue));
  };

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setUserInput(event.target.value));
  };

  useEffect(() => {
    if (!userInput && problem !== null)
      dispatch(
        setUserInput(
          `${problem.sampleTestCases.count}\r\n${problem.sampleTestCases.input}`
        )
      );
  }, [problem]);

  return (
    <StyledConsole open={openConsole}>
      <StyledConsoleContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={consoleTabIndex}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleTabsChange}
            aria-label="basic tabs example"
          >
            <Tab label="Output" {...a11yProps(0)} />
            <Tab label="TestCases" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={consoleTabIndex} index={0}>
          {isSubmissionPending || isCodeRunning ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="96%"
              height="80%"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ) : (
            <div>
              {submissionResponse !== null || runCodeResponse !== null ? (
                <Fragment>
                  {submissionResponse ? (
                    <Fragment>
                      <TextField
                        value={`${
                          submissionResponse?.status.description
                        } :\n${judgeOuptut(submissionResponse, true)}`}
                        multiline
                        fullWidth
                        minRows={4}
                        maxRows={4}
                        disabled
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography>{}</Typography>
                      <TextField
                        value={`${
                          runCodeResponse && runCodeResponse!!.status.id > 4
                            ? `${runCodeResponse?.status.description} :\n`
                            : ""
                        }${judgeOuptut(runCodeResponse)}`}
                        multiline
                        fullWidth
                        minRows={4}
                        maxRows={4}
                        disabled
                      />
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                <Typography align="center" variant="h6">
                  Submit to see results!
                </Typography>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel value={consoleTabIndex} index={1}>
          <TextField
            value={userInput ? userInput : ""}
            multiline
            fullWidth
            minRows={4}
            maxRows={4}
            onChange={handleUserInputChange}
          />
        </TabPanel>
      </StyledConsoleContainer>
    </StyledConsole>
  );
}

export default Console;
