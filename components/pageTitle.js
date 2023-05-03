import Typography from '@mui/material/Typography';

export default function PageTitle({ children, pageTitle = null }) {
  return (
    <>
      {pageTitle && <Typography variant="h4" component="h3" sx={{ marginBottom: '1em' }}>
        {pageTitle}
      </Typography>}
      {children}
    </>
  );
}
