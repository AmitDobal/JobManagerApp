import { createTheme } from "@mui/material/styles";
const primary = "#18E1D9";
const secondary = "#0B0B15";

export default createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px 24px 16px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          color: secondary,
          padding: "6px 24px",
        },
        outlined: {
          borderRadius: "35px",
          borderColor: secondary,
          padding: "6px 20px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        filled: {
          padding: "15px 0 15px 15px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          height: "49px",
          padding: "0px 0 0 10px",
        },
      },
    },
  },
});
