import { Alert, Snackbar, AlertColor } from "@mui/material";

type ToastMessageProps = {
  show: boolean;
  severity?: AlertColor;
  message: string;
  onClose: () => void;
};

function ToastMessage({
  show = false,
  severity = "error",
  message,
  onClose,
}: ToastMessageProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
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
