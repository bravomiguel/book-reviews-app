import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectOpen,
  selectAutoHideDuration,
  selectSeverity,
  selectMessage,
  closeSnackbar,
} from '@/redux/slices/snackbarSlice';

export default function SnackBar() {
  const open = useSelector(selectOpen);
  const autoHideDuration = useSelector(selectAutoHideDuration);
  const severity = useSelector(selectSeverity);
  const message = useSelector(selectMessage);
  
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(closeSnackbar());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onCloseHandler}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      sx={{ position: 'fixed', bottom: '12%' }}
    >
      <Alert
        onClose={onCloseHandler}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
