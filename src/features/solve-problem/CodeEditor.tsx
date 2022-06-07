import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";

import Color from "constants/colors";
import Screen from "constants/screens";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import {
  selectLanguage,
  setSrcCode,
} from "./solveProblemSlice";
import EditorControls from "./EditorControls";
import Console from "./Console";

const StyledCodeEditorContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${Unit.rem.MD};
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  background-color: ${Color.LIGHT};

  @media (min-width: ${Screen.MD}) {
    width: 65%;
    height: 100%;
    min-height: auto;
  }
`;

function CodeEditor() {
  const language = useReduxSelector(selectLanguage);
  const dispatch = useReduxDispatch();

  const handleEditorChange = (value: string | undefined, _: unknown) => {
    if (value) dispatch(setSrcCode(value));
  };

  return (
    <StyledCodeEditorContainer>
      <MonacoEditor
        height="92%"
        width="100%"
        language={language.name.toLowerCase()}
        defaultValue="// write your code"
        onChange={handleEditorChange}
      />
      <Console />
      <EditorControls />
    </StyledCodeEditorContainer>
  );
}

export default CodeEditor;
