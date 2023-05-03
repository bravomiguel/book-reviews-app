import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// Spinner
const LoadingView = () => <CircularProgress sx={{position: "fixed", bottom: "50%", right: "50%"}} />;

// Error + Retry
const ErrorView = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{position: "fixed", bottom: "50%", right: "50%"}}>
      <div>{error.message}</div>
      <Button variant="contained" onClick={resetErrorBoundary}>
        RETRY
      </Button>
    </div>
  );
};

// Combine and render children if it's all ok
export const QueryBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={ErrorView}
      onError={(...args) => console.log(args)}
    >
      <Suspense fallback={<LoadingView />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
