import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';

import { selectOnline, setStatus } from '@/redux/slices/offlineWarnerSlice';

export default function OfflineWarner() {
  const online = useSelector(selectOnline);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('online', () => {
      dispatch(setStatus(true));
    });
    window.addEventListener('offline', () => {
      dispatch(setStatus(false));
    });
  }, []);

  if (online) return null;

  return (
    <Alert severity="error" sx={{ position: 'fixed', width: '100vw', top: '4em', zIndex: 3, paddingTop: 0, paddingBottom: 0 }}>
      You are offline
    </Alert>
  );
}
