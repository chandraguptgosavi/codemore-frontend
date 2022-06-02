import { Alert, Snackbar, AlertColor } from "@mui/material";
import { reset } from "features/auth/authSlice";
import useReduxDispatch from "hooks/useReduxDispatch";

type ToastMessageProps = {
  show: boolean;
  severity: AlertColor;
  message: string;
};

function ToastMessage({
  show = false,
  severity,
  message,
}: ToastMessageProps) {
  const dispatch = useReduxDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(reset());
  };
  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} className="w-full">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ToastMessage;
