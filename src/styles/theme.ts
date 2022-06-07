import { createTheme } from "@mui/material/styles";

import Color from "constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: Color.PRIMARY_LIGHT,
      main: Color.PRIMARY,
      dark: Color.PRIMARY_LIGHT,
    },
    secondary: {
      light: Color.SECONDARY_LIGHT,
      main: Color.SECONDARY,
      dark: Color.SECONDARY_DARK,
    },
  },

  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default theme;